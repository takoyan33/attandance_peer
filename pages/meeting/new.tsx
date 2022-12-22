import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Input } from "@mantine/core";
import { MuiNavbar } from "../../components/MuiNavbar";
import { Button } from "@mantine/core";

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
    console.log(data.date);
    const newdate = new Date().toLocaleString("ja-JP");
    //日本時間を代入
    //写真のurlをセットする

    addDoc(databaseRef, {
      title: data.title,
      date: data.date.toLocaleString("ja-JP"),
      datedata: data.date,
      body: data.body,
      createtime: newdate,
      attandece: [],
    })
      .then(() => {
        alert("会議を登録しました");
        router.push("/");
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
      <MuiNavbar />
      <div className="max-w-5xl m-auto">
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          会議を登録する
        </h2>

        <div className="max-w-5xl m-auto">
          <form onSubmit={handleSubmit(addDate)} className="max-w-5xl m-auto">
            <div className="max-w-5xl m-auto">
              <label htmlFor="title">会議名</label>
              <Input type="text" id="title" {...register("title")} />
            </div>
            <div>
              <label htmlFor="date">日付</label>
              <Input type="date" id="date" {...register("date")} />
            </div>
            <div>
              <label htmlFor="body">内容</label>
              <Input type="text" id="body" {...register("body")} />
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
