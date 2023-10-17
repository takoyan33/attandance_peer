import Head from "next/head";
import "tailwindcss/tailwind.css";
import { Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { database } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, getDocs } from "firebase/firestore";
import { query, orderBy } from "firebase/firestore";
import { CommonHeader } from "../../stories/components/CommonHeader";
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
    zIndex: 100,
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
  const [meeting, setMeeting] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [attandece, setAttandece] = useState(0);
  const [ID, setID] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [fullname, setFullname] = useState("");
  const [univernumber, setUnivernumber] = useState("");
  const [grade, setGrade] = useState("");

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

  //ユーザーIDを取得
  const getuserID = (
    id: any,
    fullname: any,
    univernumber: any,
    grade: any,
    attandece: any
  ) => {
    setID(id);
    setFullname(fullname);
    setUnivernumber(univernumber);
    setGrade(grade);
    setIsUpdate(true);
    setAttandece(attandece);
    console.log(ID);
    console.log(fullname);
    console.log(univernumber);
    console.log(attandece);
  };

  //出席登録の取り消しモーダル
  const closeaddPresent = () => {
    setID(null);
    setIsUpdate(false);
  };

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
      <CommonHeader />
      <div className="max-w-5xl m-auto">
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          ユーザーの出席状況を確認する
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
            <h2 className="text-center text-2xl">{fullname}さんの出欠状況</h2>

            <p className="text-center my-4">
              出席数{attandece}　欠席数{meeting.length - attandece}
            </p>

            <ScrollArea sx={{ height: 300 }}>
              <Table sx={{ minWidth: 400 }}>
                <thead>
                  <tr>
                    <th>会議日</th>
                    <th>会議名</th>
                    <th>出欠状況</th>
                  </tr>
                </thead>
                <tbody>
                  {meeting &&
                    meeting.map((meeting) => (
                      <tr key={meeting.id}>
                        <td>{meeting.date}</td>
                        <td>
                          <Group spacing="xs">
                            <Text size="sm" weight={300}>
                              {meeting.title}
                            </Text>
                          </Group>
                        </td>
                        <td>
                          {meeting.attandece.includes(univernumber) ? (
                            <div className="mt-2">
                              <Checkbox transitionDuration={0} checked />
                            </div>
                          ) : (
                            <>
                              <Checkbox transitionDuration={0} />
                            </>
                          )}
                          {meeting.attandece === univernumber ? (
                            <p></p>
                          ) : (
                            <p></p>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </ScrollArea>
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
                <th>出席数</th>
                <th>欠席数</th>
                <th>出席率</th>
                <th>詳細</th>
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
                    <td>{user.attandece}</td>
                    <td>{meeting.length - user.attandece}</td>
                    <td>
                      {((user.attandece / meeting.length) * 100).toFixed()}%
                    </td>
                    <td>
                      <button
                        onClick={() =>
                          getuserID(
                            user.id,
                            user.fullname,
                            user.univernumber,
                            user.grade,
                            user.attandece
                          )
                        }
                        className="text-blue-600 underline"
                      >
                        確認する
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
