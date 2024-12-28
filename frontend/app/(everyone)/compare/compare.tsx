'use client';

import { Package } from '@/api/post.api';
import { Card } from '@/components/ui/card';
import { translateDuration } from '@/lib/utils';

type CompareTableProps = {
  packages: Package[];
};

export function CompareTable({ packages }: CompareTableProps) {
  return (
    <div className="w-full p-4">
      <div className="mt-4">
        <Card className="p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="py-4 px-2 text-left">Tính năng</th>
                {packages.map((pkg) => (
                  <th key={pkg.title} className="py-4 px-2 text-center">
                    {pkg.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-2 font-medium">Giá</td>
                {packages.map((pkg) => (
                  <td key={pkg.title} className="py-4 px-2 text-center">
                    {pkg.price} VND
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-2 font-medium">Thời gian thực hiện</td>
                {packages.map((pkg) => (
                  <td key={pkg.title} className="py-4 px-2 text-center">
                    {pkg.deliveryTime} {translateDuration(pkg.durationType)}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-2 font-medium">Mô tả công việc</td>
                {packages.map((pkg) => (
                  <td key={pkg.title} className="py-4 px-2 text-center text-wrap max-w-64">
                    {pkg.description}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="py-4 px-2 font-medium">Số lần sửa</td>
                {packages.map((pkg) => (
                  <td key={pkg.title} className="py-4 px-2 text-center">
                    {pkg.revision} lần
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}

export default CompareTable;
