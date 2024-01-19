"use client";
import { useState, useEffect } from "react";
import Hero from "@components/Hero";
import Table from "@components/Table";
import Condition from "@components/Condition";
import Footer from "@components/Footer";
import Header from "@components/Header";

function page() {
  const [changeState, setChangeState] = useState<boolean>(true);

  const [compareDataInitial, setcompareDataInitial] = useState<any>([]);
  console.log(changeState);

  return (
    <div>
      <Header setValue={setChangeState} value={changeState} />
      <Hero
        changeState={changeState}
        saveData={setcompareDataInitial}
        initialData={compareDataInitial}
      />
      {changeState ? (
        <>
          <Table
            initialData={compareDataInitial?.general}
            title={"วิชาที่สามารถเทียบโอนได้"}
            dupicate={compareDataInitial?.dupicate}
          />
          <Table
            initialData={compareDataInitial?.notCompare}
            title={"รายวิชาที่ไม่สามารถเทียบโอนได้"}
          />
        </>
      ) : (
        <>
          <Condition />
        </>
      )}

      <Footer />
    </div>
  );
}

export default page;

export function usePreventZoom(scrollCheck = true, keyboardCheck = true) {
  useEffect(() => {
    const handleKeydown = (e: any) => {
      if (
        keyboardCheck &&
        e.ctrlKey &&
        (e.keyCode == "61" ||
          e.keyCode == "107" ||
          e.keyCode == "173" ||
          e.keyCode == "109" ||
          e.keyCode == "187" ||
          e.keyCode == "189")
      ) {
        e.preventDefault();
      }
    };

    const handleWheel = (e: any) => {
      if (scrollCheck && e.ctrlKey) {
        e.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, [scrollCheck, keyboardCheck]);
}
