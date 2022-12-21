import Head from "next/head";
import "tailwindcss/tailwind.css";
import { Inter } from "@next/font/google";
import { Input } from "@mantine/core";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { MuiNavbar } from "../../components/MuiNavbar";
import { doc, updateDoc } from "firebase/firestore";
import { InputBase } from "@mantine/core";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  TextInput,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import Modal from "react-modal";
import { TableSort } from "./TableSort";

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 150ms ease, box-shadow 100ms ease",
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    "&:hover": {
      boxShadow: theme.shadows.md,
    },

    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.pink[6],
        theme.colors.orange[6]
      ),
    },
  },
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

export default function Edit() {
  const { register, handleSubmit } = useForm();
  const [title, setTitle] = useState("");
  const [meeting, setMeeting] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [ID, setID] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fullname, setFullname] = useState("");
  const [univernumber, setUnivernumber] = useState("");
  const [grade, setGrade] = useState("");

  //ユーザーを編集する
  const updatefields = (data: any) => {
    //更新する
    let fieldToEdit = doc(database, "users", ID);
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      fullname: data.fullname,
      univernumber: data.univernumber,
      grade: data.grade,
    })
      .then(() => {
        setIsUpdate(false);
        setID(null);
        setFullname("");
        setUnivernumber("");
        setGrade("");
        alert("ユーザー編集しました");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //usersを取得
  useEffect(() => {
    const usersCollectionRef = collection(database, "users");
    onSnapshot(usersCollectionRef, (querySnapshot) => {
      setUsers(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  //ユーザー編集
  const getuserID = (id: any, fullname: any, univernumber: any, grade: any) => {
    setID(id);
    setFullname(fullname);
    setUnivernumber(univernumber);
    setGrade(grade);
    setIsUpdate(true);
    console.log(ID);
    console.log(fullname);
    console.log(univernumber);
  };

  //出席登録の取り消しモーダル
  const closeaddPresent = (id: any) => {
    setID(id);
    setIsUpdate(false);
  };

  console.log(users);
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

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
          ユーザーを編集する
        </h2>
        {/* 
        <TableSort data={users} /> */}

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
            <h2 className="text-center text-2xl">{fullname}さんを編集画面</h2>
            <form onSubmit={handleSubmit(updatefields)}>
              <div>
                <label htmlFor="fullname">名前</label>
                <Input type="text" id="fullname" {...register("fullname")} />
              </div>
              <div>
                <label htmlFor="univernumber">学籍番号</label>
                <Input
                  type="number"
                  id="univernumber"
                  {...register("univernumber")}
                />
              </div>
              <div>
                <InputBase
                  label="学年"
                  component="select"
                  mt="md"
                  id="univeryear"
                  {...register("univeryear")}
                >
                  <option value="インターン">インターン</option>
                  <option value="1年目">1年目</option>
                  <option value="2年目">2年目</option>
                  <option value="アドバイザー">アドバイザー</option>
                </InputBase>
              </div>
              <div>
                <InputBase
                  label="性別"
                  component="select"
                  mt="md"
                  id="belong"
                  {...register("belong")}
                >
                  <option value="男性">男性</option>
                  <option value="女性">女性</option>
                  <option value="非公開">非公開</option>
                </InputBase>
              </div>
              <div>
                <InputBase
                  label="現在の在籍状況"
                  component="select"
                  mt="md"
                  id="belong"
                  {...register("belong")}
                >
                  <option value="在籍中">在籍中</option>
                  <option value="未在籍">未在籍</option>
                </InputBase>
              </div>
              <div className="my-4 text-center">
                <Button type="submit" variant="outline" color="cyan">
                  送信
                </Button>
              </div>
            </form>
          </div>
        )}

        <ScrollArea sx={{ height: 500 }}>
          <Table sx={{ minWidth: 1000 }}>
            <thead
              className={cx(classes.header, {
                [classes.scrolled]: scrolled,
              })}
            >
              <tr>
                <th>名前</th>
                <th>学籍番号</th>
                <th>年次</th>
                <th>性別</th>
                <th>在籍状況</th>
                <th>編集</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <Group spacing="xs">
                        <Text size="sm" weight={300}>
                          {user.fullname}
                        </Text>
                      </Group>
                    </td>
                    <td>{user.univernumber}</td>
                    <td>{user.grade}</td>
                    <td>男</td>
                    <td>在籍中</td>
                    <td>
                      <button
                        onClick={() =>
                          getuserID(
                            user.id,
                            user.fullname,
                            user.univernumber,
                            user.grade
                          )
                        }
                        className="border"
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
