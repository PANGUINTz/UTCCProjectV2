import React from "react";
import Image from "next/image";

type Course = {
  _id: string;
  course_code: string;
  course_name: string;
  course_credit: number;
  convert_code: string;
  convert_name: string;
  convert_credit: number;
  category: string;
  desc: string;
}[];

type TableProps = {
  initialData: Course[];
  title: string;
  dupicate?: any;
};

const index = ({ initialData, title, dupicate }: TableProps) => {
  console.log(initialData);

  console.log(dupicate);

  return (
    <div>
      <div className="container mx-auto my-20">
        <div>
          <h3 className="text-black mb-3 mt-5">{title}</h3>
          <table className="text-white w-full text-left">
            <tbody>
              <tr>
                <th className="p-5 bg-green-700">รหัสวิชา-ชื่อวิชา</th>
                <th className="p-5  bg-green-700 text-center">หน่วยกิต</th>
                {title !== "รายวิชาที่ไม่สามารถเทียบโอนได้" ? (
                  <>
                    <th className="p-5 bg-gray-800">
                      รหัสวิชา-ชื่อวิชา (วิชาที่เทียบหน่วยกิตได้)
                    </th>
                    <th className="p-5 bg-gray-800 text-center">หน่วยกิต</th>
                    <th className="p-5 bg-gray-800 text-center">หมวดวิชา</th>
                  </>
                ) : (
                  <>
                    <th className="p-5 bg-gray-800 text-center">หมายเหตุ</th>
                  </>
                )}
              </tr>
              {initialData ? (
                initialData?.map((data: any, k: number) => (
                  <tr
                    className="border-b border-gray-500 bg-white text-black"
                    key={k}
                  >
                    <td className="p-5">
                      <p>
                        {data?.course_code} {data?.course_name}
                      </p>
                    </td>
                    <td className="p-5 text-center border-r-4">
                      <p>{data?.course_credit}</p>
                    </td>
                    {title === "รายวิชาที่ไม่สามารถเทียบโอนได้" ? (
                      <td className="p-5">
                        {data?.desc
                          ? data?.desc
                          : "รายวิชานี้หน่วยกิตไม่เพียงพอต่อการเทียบโอน"}
                      </td>
                    ) : (
                      <>
                        <td className="p-5">
                          {data?.convert_code} {data?.convert_name}
                        </td>
                        <td className="p-5 text-center">
                          <p>{data?.course_credit}</p>
                        </td>
                        <td className="p-5 text-center border-r-4">
                          <p>{data?.category}</p>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              ) : (
                <tr className="">
                  <td className="text-black" colSpan={5}>
                    <div className="flex flex-col items-center p-2.5">
                      <Image
                        src={"/assets/images/search.png"}
                        alt={"search"}
                        width={70}
                        height={70}
                      />
                      ไม่มีข้อมูล
                    </div>
                  </td>
                </tr>
              )}

              {dupicate &&
                dupicate.map((dupicateValue: any, index: number) => (
                  <>
                    {Object.keys(dupicateValue).map((convertCode) => (
                      <>
                        <tr className="border-b border-gray-500 bg-white text-black">
                          <td className="p-5">
                            {dupicateValue[convertCode].map(
                              (item: any, number: number) => (
                                <p key={number}>
                                  {item.course_code} {item.course_name}
                                </p>
                              )
                            )}
                          </td>
                          <td className="p-5 text-center border-r-4">
                            {dupicateValue[convertCode].map(
                              (item: any, number: number) => (
                                <p key={number}>{item.course_credit}</p>
                              )
                            )}
                          </td>
                          <td className="p-5">
                            <p>
                              {dupicateValue[convertCode][0].convert_code}
                              &nbsp;
                              {dupicateValue[convertCode][0].convert_name}
                            </p>
                          </td>
                          <td className="p-5 text-center">
                            {dupicateValue[convertCode][0].convert_credit}
                          </td>
                          <td className="p-5 text-center">
                            {dupicateValue[convertCode][0].category}
                          </td>
                        </tr>
                      </>
                    ))}
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default index;
