import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";

import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
} from "@mantine/core";

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
    addDoc(databaseRef, {
      title: data.univernumber,
      date: data.date,
      body: data.body,
      createtime: newdate,
    })
      .then(() => {
        alert("ユーザーを登録しました");
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

      <div className="max-w-5xl m-auto">
        <h2>会議を登録する</h2>

        <div>
          <form onSubmit={handleSubmit(addDate)}>
            <div>
              <label htmlFor="title">タイトル</label>
              <input type="text" id="title" {...register("title")} />
            </div>
            <div>
              <label htmlFor="date">日付</label>
              <input type="date" id="date" {...register("date")} />
            </div>
            <div>
              <label htmlFor="body">内容</label>
              <input type="text" id="body" {...register("body")} />
            </div>
            <button type="submit">送信</button>
          </form>
        </div>
      </div>
    </>
  );
}
