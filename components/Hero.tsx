"use client";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { compareSubject } from "../service/subjectCompare";

type Course = {
  _id: string;
  course_code: string;
  course_name: string;
  course_credit: number;
  convert_code: string;
  convert_name: string;
  convert_credit: number;
  category: string;
};

type CourseForm = {
  general: Course[];
  dupicate: Course[];
  notCompare: Course[];
};
type HeroProps = {
  changeState: boolean;
  saveData: (value: CourseForm) => void;
  initialData: any;
};

const index = ({ changeState, saveData, initialData }: HeroProps) => {
  const [formData, setFormData] = useState("");
  const handleSubmit = async () => {
    const splitData = formData.split(/[,\s]+/);

    if (splitData[0] === "") {
      Swal.fire({
        title: "กรุณากรอกรหัสวิชาเพื่อตรวจสอบ",
        icon: "error",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      const course_N: any = {};
      for (let i = 0; i < splitData.length; i++) {
        course_N[`course_N${i + 1}`] = splitData[i];
      }

      if (initialData.length === 0) {
        // when no have old data
        let validate = 0;
        let duplicateErr = [];
        for (let i = 0; i < splitData.length; i++) {
          for (let j = 0; j < splitData.length; j++) {
            if (splitData[i] == splitData[j] && i != j) {
              validate = 1;
              duplicateErr.push(splitData[j]);
              break;
            }
          }
        }
        if (validate != 1) {
          const data = await compareSubject(course_N);
          saveData(data);
        } else {
          Swal.fire({
            title: "ไม่สามารถเทียบวิชาซ้ำได้",
            text: `มีวิชาดังนี้ ${duplicateErr.map((item) => ` ${item}`)}`,
            icon: "error",
          });
        }
      } else {
        let validate = 0;
        let duplicateErr = [];

        if (initialData.general.length > 0) {
          for (let i = 0; i < initialData.general.length; i++) {
            for (let j = 0; j < splitData.length; j++) {
              if (initialData.general[i].course_code === splitData[j]) {
                validate = 1;
                duplicateErr.push(splitData[j]);
                break;
              }
            }
          }
        }
        if (initialData.dupicate[0]) {
          console.log(initialData.dupicate.length);

          if (initialData.dupicate.length === 1) {
            Object.keys(initialData.dupicate[0]).map((convertCode) => {
              for (
                let i = 0;
                i < initialData.dupicate[0][convertCode].length;
                i++
              ) {
                for (let j = 0; j < splitData.length; j++) {
                  if (
                    initialData.dupicate[0][convertCode][i].course_code ===
                    splitData[j]
                  ) {
                    validate = 1;
                    duplicateErr.push(splitData[j]);
                    break;
                  }
                }
              }
            });
          } else {
            for (let i = 0; i < initialData.dupicate.length; i++) {
              Object.keys(initialData.dupicate[i]).map((convertCode) => {
                console.log(initialData.dupicate[i][convertCode].length);
                for (
                  let j = 0;
                  j < initialData.dupicate[i][convertCode].length;
                  j++
                ) {
                  console.log(initialData.dupicate[i][convertCode][j]);
                  for (let k = 0; k < splitData.length; k++) {
                    if (
                      splitData[k] ===
                      initialData.dupicate[i][convertCode][j].course_code
                    ) {
                      validate = 1;
                      duplicateErr.push(splitData[j]);
                      break;
                    }
                  }
                }
              });
            }
          }
        }
        if (initialData.notCompare.length > 0) {
          console.log("InitData");

          for (let i = 0; i < initialData.notCompare.length; i++) {
            for (let j = 0; j < splitData.length; j++) {
              if (initialData.notCompare[i].course_code === splitData[j]) {
                validate = 1;
                duplicateErr.push(splitData[j]);
                break;
              }
            }
          }
        }

        if (validate != 1) {
          console.log("success");
          const data = await compareSubject(course_N);
          const mergedData = {
            general: initialData.general.concat(data.general),
            dupicate: initialData.dupicate?.concat(data.dupicate),
            notCompare: initialData.notCompare?.concat(data.notCompare),
          };
          saveData(mergedData);
        } else {
          console.log("failed");
          Swal.fire({
            title: "ไม่สามารถเทียบวิชาซ้ำได้",
            text: `มีวิชาดังนี้ ${duplicateErr.map((item) => ` ${item}`)}`,
            icon: "error",
          });
        }
      }
    }
  };

  return (
    <div className="relative">
      <Image
        src={"/assets/images/hero_image.png"}
        alt="hero"
        className="w-screen max-md:object-fill"
        style={{ height: "480px" }}
        width={1080}
        height={1080}
      />
      {changeState ? (
        <div>
          <p className="absolute text-white font-extralight tracking-widest spacing border-b border-white top-1/2 translate-x-1/2 translate-y-1/2 right-1/2 text-4xl duration-200 max-md:text-2xl max-[500px]:text-xl ">
            เทียบโอนหลักสูตร
          </p>
          <div className="bg-white absolute z-10 px-6 py-4 xl:w-1/3 shadow-md bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 shadow-gray-600 max-xl:w-11/12 duration-200 max-[500px]:my-5 max-md:text-sm ">
            <div>
              <p className="font-light ">
                กรุณากรอกรหัสวิชาสำหรับตรวจสอบการเทียบโอน
              </p>
            </div>

            <div className="flex">
              <input
                type="text"
                className="w-full my-2 mr-3 p-2 rounded border border-gray-400 "
                placeholder="ตัวอย่างการกรอกรหัสวิชา 30000-1200, 30000-1201"
                onChange={(e) => setFormData(e.target.value)}
              />
              <button
                className="bg-green-700 py-2 px-5 text-white hover:bg-green-900 duration-300 rounded-lg h-fit mt-2"
                onClick={handleSubmit}
              >
                ยืนยัน
              </button>
            </div>
            <p className="text-red-500">*กรุณากรอกรหัสวิชาให้ถูกต้อง</p>
          </div>
        </div>
      ) : (
        <p className="absolute text-white font-extralight tracking-widest spacing border-b border-white top-1/2 translate-x-1/2 translate-y-1/2 right-1/2 text-4xl duration-200 max-md:text-2xl max-[500px]:text-xl ">
          เงื่อนไขการเทียบโอน
        </p>
      )}
    </div>
  );
};

export default index;
