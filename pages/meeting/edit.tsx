import Head from "next/head";
import "tailwindcss/tailwind.css";
import { Inter } from "@next/font/google";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { CommonHeader } from "../../stories/components/CommonHeader";
import { doc, updateDoc } from "firebase/firestore";
import moment from "moment";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify, signupmissnotify } from "../../stories/components/SiteModal";

export default function Edit() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [title, setTitle] = useState("");
  const [meeting, setMeeting] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [ID, setID] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const target = moment().format("YYYY-MM-DD");

  //ユーザーを編集する
  const updatefields = (data: any) => {
    //更新する
    let meetingToEdit = doc(database, "meeting", ID);
    //セットしたIDをセットする
    updateDoc(meetingToEdit, {
      title: data.title,
      date: data.date,
      body: data.body,
    })
      .then(() => {
        setIsUpdate(false);
        setID(null);
        setDate("");
        setBody("");
        setTitle("");
        notify("ユーザーを編集しました");
      })
      .catch((err) => {
        signupmissnotify("ユーザー編集に失敗しました");
        console.log(err);
      });
  };
  //usersとmeetingを取得
  useEffect(() => {
    const usersCollectionRef = collection(database, "users");
    onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });

    const meetingCollectionRef = collection(database, "meeting");
    const m = query(meetingCollectionRef, orderBy("date", "desc"));
    onSnapshot(m, (querySnapshot) => {
      setMeeting(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  //個別会議を取得
  useEffect(() => {
    if (isUpdate) {
      const fetch = async () => {
        const fieldToEdit = doc(database, "meeting", ID);
        const docSnap = await getDoc(fieldToEdit);
        if (docSnap.exists()) {
          reset(docSnap.data());
        } else {
          console.log("No such document!");
        }
      };
      fetch();
    }
  }, [isUpdate]);

  //会議の編集
  const getuserID = (id: string, title: string, date: any, body: string) => {
    setID(id);
    setTitle(title);
    // setDate(date);
    // setBody(body);
    setIsUpdate(true);
  };

  //出席登録の取り消しモーダル
  const closeaddPresent = (id: any) => {
    setID(null);
    // setDate("");
    // setBody("");
    setTitle("");
    setIsUpdate(false);
  };
  return (
    <>
      <Head>
        <title>出席管理</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonHeader />
      <ToastContainer />
      <div className="max-w-5xl m-auto">
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          会議を編集する
        </h2>
        <p className="text-center">会議数　{meeting.length}件</p>

        {isUpdate && (
          <div>
            <Button
              type="submit"
              variant="outline"
              color="cyan"
              onClick={closeaddPresent}
            >
              編集を取り消す
            </Button>
            {/* <Button
              type="submit"
              variant="outline"
              color="cyan"
              onClick={closeaddPresent}
            >
              会議を削除する
            </Button> */}
            <h2 className="text-center text-2xl">
              {date}
              {title}の編集画面
            </h2>
            <form onSubmit={handleSubmit(updatefields)}>
              <div className="max-w-5xl m-auto">
                <label htmlFor="title">
                  会議名<span className="text-red-700">*</span>
                </label>
                <Input
                  type="text"
                  id="title"
                  {...register("title", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="date">
                  日付<span className="text-red-700">*</span>
                </label>
                <Input
                  type="date"
                  id="date"
                  {...register("date", { required: true })}
                />
              </div>
              <div>
                <label htmlFor="body">内容</label>
                <Input type="text" id="body" {...register("body")} />
              </div>
              <div className="my-4 text-center">
                <Button type="submit" variant="outline" color="cyan">
                  編集する
                </Button>
              </div>
            </form>
          </div>
        )}

        <ScrollArea sx={{ height: 500 }}>
          <Table sx={{ minWidth: 1000 }}>
            <thead>
              <tr>
                <th>日付</th>
                <th>開催</th>
                <th>会議</th>
                <th>内容</th>
                <th>出席数</th>
                <th>欠席数</th>
                <th>出席率</th>
                <th>編集</th>
              </tr>
            </thead>
            <tbody>
              {meeting &&
                meeting.map((meeting) => (
                  <tr key={meeting.id}>
                    <td>{meeting.date}</td>
                    <td>
                      {target < meeting.date ? (
                        <span className=" text-green-700">開催前</span>
                      ) : (
                        <span className="text-blue-600">開催後</span>
                      )}
                    </td>
                    <td>
                      <Group spacing="xs">
                        <Text size="sm" weight={300}>
                          {meeting.title}
                        </Text>
                      </Group>
                    </td>
                    <td>{meeting.body}</td>
                    <td>{meeting.attandece?.length}</td>
                    <td>{users.length - meeting.attandece?.length}</td>
                    <td>
                      {Math.floor(
                        (meeting.attandece?.length / users.length) * 100
                      )}
                      %
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          getuserID(
                            meeting.id,
                            meeting.title,
                            meeting.date,
                            meeting.body
                          )
                        }
                        className="text-blue-600 underline"
                      >
                        編集する
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </ScrollArea>
      </div>
    </>
  );
}
