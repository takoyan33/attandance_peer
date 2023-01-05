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
import { InputBase } from "@mantine/core";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [meeting, setMeeting] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const databaseRef = collection(database, "meeting");
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
      present: true,
    })
      .then(() => {
        alert("ユーザー登録しました");
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const usersCollectionRef = collection(database, "users");
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setUsers(querySnapshot.docs.map((doc) => doc.data()));
    });

    const meetingCollectionRef = collection(database, "meeting");
    getDocs(meetingCollectionRef).then((querySnapshot) => {
      setMeeting(querySnapshot.docs.map((doc) => doc.data()));
    });
  }, []);
  return (
    <>
      <Head>
        <title>出席管理</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-5xl m-auto">
        <h2>ユーザーを登録する</h2>

        <div>
          <form onSubmit={handleSubmit(addDate)}>
            <div>
              <label htmlFor="fullname">メールアドレス</label>
              <Input type="text" id="fullname" {...register("fullname")} />
            </div>

            <label htmlFor="univernumber">パスワード</label>
            <Input
              type="text"
              id="univernumber"
              {...register("univernumber")}
            />

            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </>
  );
}
