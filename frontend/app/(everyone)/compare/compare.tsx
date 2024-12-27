'use client';

import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CompareTable() {
  const packages = [
    {
      name: "Gói Thông Thường",
      price: "100000VNĐ",
      delivery: "1 Giờ",
      description: "Xóa nền hay chi tiết theo yêu cầu",
      revisions: "1 lần yêu cầu sửa chữa",
    },
    {
      name: "Gói Cao Cấp", 
      price: "199000VNĐ",
      delivery: "5 Giờ",
      description: "Thay đổi cảnh vậy dựng lại bối cảnh hay ngoại trang, phục chế ảnh cũ v.v",
      revisions: "5 lần yêu cầu sửa chữa",
    }
  ];

  return (
    <div className="w-full p-4">
      <Tabs defaultValue="compare" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">Gói Thông Thường</TabsTrigger>
          <TabsTrigger value="basic">Gói cao cấp</TabsTrigger>
        </TabsList>
        <div className="mt-4">
          <Card className="p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-4 px-2 text-left">Tính năng</th>
                  {packages.map((pkg) => (
                    <th key={pkg.name} className="py-4 px-2 text-center">{pkg.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-4 px-2 font-medium">Giá</td>
                  {packages.map((pkg) => (
                    <td key={pkg.name} className="py-4 px-2 text-center">{pkg.price}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-2 font-medium">Thời gian thực hiện</td>
                  {packages.map((pkg) => (
                    <td key={pkg.name} className="py-4 px-2 text-center">{pkg.delivery}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-2 font-medium">Mô tả công việc</td>
                  {packages.map((pkg) => (
                    <td key={pkg.name} className="py-4 px-2 text-center">{pkg.description}</td>
                  ))}
                </tr>
                <tr className="border-b">
                  <td className="py-4 px-2 font-medium">Số lần sửa</td>
                  {packages.map((pkg) => (
                    <td key={pkg.name} className="py-4 px-2 text-center">{pkg.revisions}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </Card>
        </div>
      </Tabs>
    </div>
  );
}

export default CompareTable;
