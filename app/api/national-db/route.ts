import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || '';
  const searchType = searchParams.get('type') || 'name'; // name, regNo, activeIngredient

  // In a real scenario, you would fetch from the actual API:
  // const apiUrl = process.env.NATIONAL_PHARMA_API_URL;
  // const apiKey = process.env.NATIONAL_PHARMA_API_KEY;
  // const response = await fetch(`${apiUrl}/medicines?${searchType}=${query}`, {
  //   headers: { 'Authorization': `Bearer ${apiKey}` }
  // });
  // const data = await response.json();

  // Mock Data matching Cục Quản lý Dược structure
  const mockData = [
    {
      id: '1',
      registrationNo: 'VD-31580-19',
      name: 'Paracetamol 500mg',
      activeIngredient: 'Paracetamol 500mg',
      dosageForm: 'Viên nén',
      packaging: 'Hộp 10 vỉ x 10 viên',
      manufacturer: 'Công ty cổ phần Dược phẩm Trung ương 1 - Pharbaco',
      country: 'Việt Nam',
      standard: 'TCCS',
      issueDate: '2019-05-15',
    },
    {
      id: '2',
      registrationNo: 'VN-22051-19',
      name: 'Augmentin 1g',
      activeIngredient: 'Amoxicillin 875mg; Acid clavulanic 125mg',
      dosageForm: 'Viên nén bao phim',
      packaging: 'Hộp 2 vỉ x 7 viên',
      manufacturer: 'SmithKline Beecham Pharmaceuticals',
      country: 'Anh',
      standard: 'NSX',
      issueDate: '2019-08-20',
    },
    {
      id: '3',
      registrationNo: 'VD-20412-14',
      name: 'Ameflu',
      activeIngredient: 'Paracetamol 500mg; Dextromethorphan HBr 15mg; Pseudoephedrin HCl 30mg',
      dosageForm: 'Viên nén bao phim',
      packaging: 'Hộp 10 vỉ x 10 viên',
      manufacturer: 'Công ty cổ phần Dược phẩm OPV',
      country: 'Việt Nam',
      standard: 'TCCS',
      issueDate: '2014-01-10',
    },
    {
      id: '4',
      registrationNo: 'VN-18542-14',
      name: 'Lipitor 20mg',
      activeIngredient: 'Atorvastatin 20mg',
      dosageForm: 'Viên nén bao phim',
      packaging: 'Hộp 3 vỉ x 10 viên',
      manufacturer: 'Pfizer Pharmaceuticals LLC',
      country: 'Puerto Rico',
      standard: 'NSX',
      issueDate: '2014-12-30',
    },
    {
      id: '5',
      registrationNo: 'VD-28711-18',
      name: 'Hapacol 250',
      activeIngredient: 'Paracetamol 250mg',
      dosageForm: 'Thuốc bột sủi bọt',
      packaging: 'Hộp 24 gói x 1,5g',
      manufacturer: 'Công ty TNHH MTV Dược phẩm DHG',
      country: 'Việt Nam',
      standard: 'TCCS',
      issueDate: '2018-02-15',
    }
  ];

  // Filter mock data based on query
  const filtered = query ? mockData.filter(item => {
    if (searchType === 'name') return item.name.toLowerCase().includes(query.toLowerCase());
    if (searchType === 'regNo') return item.registrationNo.toLowerCase().includes(query.toLowerCase());
    if (searchType === 'activeIngredient') return item.activeIngredient.toLowerCase().includes(query.toLowerCase());
    return false;
  }) : mockData;

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
    message: 'Lấy dữ liệu từ CSDL Quốc gia thành công (Mock)'
  });
}
