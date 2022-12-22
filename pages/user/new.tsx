import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { Input } from "@mantine/core";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { InputBase } from "@mantine/core";
import { MuiNavbar } from "../../components/MuiNavbar";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const usersRef = collection(database, "users");
  //新しい順
  const q = query(usersRef, orderBy("timestamp", "desc"));

  const addDate = (data: any) => {
    const newdate = new Date().toLocaleString("ja-JP");
    //日本時間を代入
    //写真のurlをセットする
    addDoc(usersRef, {
      fullname: data.fullname,
      univernumber: data.univernumber,
      grade: data.grade,
      createtime: newdate,
      gender: "男性",
      belong: true,
      attend: 0,
    })
      .then(() => {
        alert("ユーザー登録しました");
        router.push("/");
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <>
      <Head>
        <title>出席管理</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MuiNavbar />

      <div className="max-w-5xl m-auto">
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          ユーザーを登録する
        </h2>

        <div>
          <form onSubmit={handleSubmit(addDate)}>
            <div>
              <label htmlFor="fullname">名前</label>
              <Input type="text" id="fullname" {...register("fullname")} />
            </div>
            <div>
              <label htmlFor="univernumber">学籍番号</label>
              <Input
                type="text"
                id="univernumber"
                {...register("univernumber")}
              />

              <InputBase
                label="年度"
                component="select"
                mt="md"
                id="grade"
                {...register("grade")}
              >
                <option value="インターン">インターン</option>
                <option value="1年目">1年目</option>
                <option value="2年目">2年目</option>
                <option value="アドバイザー">アドバイザー</option>
              </InputBase>
            </div>
            <div className="my-4 text-center">
              <Button type="submit" variant="outline" color="cyan">
                登録する
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
