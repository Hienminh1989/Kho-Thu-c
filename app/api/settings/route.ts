import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const ENV_PATH = path.join(process.cwd(), '.env');

export async function GET() {
  try {
    let envContent = '';
    if (fs.existsSync(ENV_PATH)) {
      envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    }

    // Parse the .env file manually
    const settings: Record<string, string> = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#\s]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        let value = match[2].trim();
        // Remove surrounding quotes if any
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        settings[key] = value;
      }
    });

    return NextResponse.json({
      databaseUrl: settings['DATABASE_URL'] || '',
      pharmaApiUrl: settings['NATIONAL_PHARMA_API_URL'] || 'https://api.drugbank.vn/v1',
      pharmaApiKey: settings['NATIONAL_PHARMA_API_KEY'] || '',
      zaloPhone: settings['NEXT_PUBLIC_ZALO_PHONE'] || '',
    });
  } catch (error) {
    console.error('Error reading settings:', error);
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { databaseUrl, pharmaApiUrl, pharmaApiKey, zaloPhone } = body;

    let envContent = '';
    if (fs.existsSync(ENV_PATH)) {
      envContent = fs.readFileSync(ENV_PATH, 'utf-8');
    }

    const envMap = new Map<string, string>();
    
    // Parse existing
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^#\s]+)=(.*)$/);
      if (match) {
        envMap.set(match[1].trim(), match[2].trim());
      }
    });

    // Update with new values
    if (databaseUrl !== undefined) envMap.set('DATABASE_URL', `"${databaseUrl}"`);
    if (pharmaApiUrl !== undefined) envMap.set('NATIONAL_PHARMA_API_URL', `"${pharmaApiUrl}"`);
    if (pharmaApiKey !== undefined) envMap.set('NATIONAL_PHARMA_API_KEY', `"${pharmaApiKey}"`);
    if (zaloPhone !== undefined) envMap.set('NEXT_PUBLIC_ZALO_PHONE', `"${zaloPhone}"`);

    // Reconstruct .env content
    // We will preserve the existing file structure if possible, but for simplicity we can just rewrite it
    // Let's try to replace inline to keep comments
    let newEnvContent = envContent;
    
    const updateOrAdd = (key: string, value: string) => {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      if (regex.test(newEnvContent)) {
        newEnvContent = newEnvContent.replace(regex, `${key}=${value}`);
      } else {
        newEnvContent += `\n${key}=${value}`;
      }
    };

    if (databaseUrl !== undefined) updateOrAdd('DATABASE_URL', `"${databaseUrl}"`);
    if (pharmaApiUrl !== undefined) updateOrAdd('NATIONAL_PHARMA_API_URL', `"${pharmaApiUrl}"`);
    if (pharmaApiKey !== undefined) updateOrAdd('NATIONAL_PHARMA_API_KEY', `"${pharmaApiKey}"`);
    if (zaloPhone !== undefined) updateOrAdd('NEXT_PUBLIC_ZALO_PHONE', `"${zaloPhone}"`);

    fs.writeFileSync(ENV_PATH, newEnvContent.trim() + '\n', 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
