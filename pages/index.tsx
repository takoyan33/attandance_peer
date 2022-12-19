import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Paper, ThemeIcon } from "@mantine/core";
import { database } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { query, orderBy } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { Input } from "@mantine/core";
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  createStyles,
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
} from "@mantine/core";
import { MuiNavbar } from "../components/MuiNavbar";
import Modal from "react-modal";

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
}));

interface CardGradientProps {
  title: string;
  date: string;
  present: string;
  absent: any;
  wariai: any;
  id: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function Home() {
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function afterOpenModal() {
    if (subtitle) subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  type FormData = {
    univernumber: number;
  };
  const { classes } = useStyles();
  const { register, handleSubmit } = useForm<FormData>();
  const [IsPresent, setIsPresent] = useState(false);
  const [meeting, setMeeting] = useState<any[]>([]);
  const [ID, setID] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();

  const updatefields = (data: FormData) => {
    //更新する
    let fieldToEdit = doc(database, "meeting", ID);
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      attandece: arrayUnion(data.univernumber),
    })
      .then(() => {
        setIsUpdate(false);
        alert("出席登録しました");
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

    const deletefields = (data: FormData) => {
      //更新する
      let fieldToEdit = doc(database, "meeting", ID);
      //セットしたIDをセットする
      updateDoc(fieldToEdit, {
        attandece: arrayRemove(data.univernumber),
      })
        .then(() => {
          setIsUpdate(false);
          alert("出席を削除しました");
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    };
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

  console.log(meeting);
  console.log(users);

  const getID = (id: any, date: any, title: any) => {
    setTitle(title);
    setDate(date);
    setIsOpen(true);
    setID(id);
    setIsUpdate(true);
    console.log(ID);
  };

  const getPresent = (id: any) => {
    setID(id);
    setIsPresent(true);
    console.log(ID);
  };

  const closePresent = (id: any) => {
    setID(id);
    setIsPresent(false);
    console.log(ID);
  };

  const closeaddPresent = (id: any) => {
    setID(id);
    setIsOpen(false);
    setIsUpdate(false);
    console.log(ID);
  };

  // const sample_data = [
  //   { name: "ONE PIECE", value: 1 },
  //   { name: "呪術廻戦", value: 2 },
  //   { name: "キングダム", value: 2 },
  // ];

  // const COLORS = [
  //   "#0088FE",
  //   "#00C49F",
  //   "#FFBB28",
  //   "#FF8042",
  //   "#ff6361",
  //   "#8884d8",
  //   "#C1C1C1",
  // ];
  // const RADIAN = Math.PI / 180;
  // const renderCustomizedLabel = ({
  //   cx,
  //   cy,
  //   midAngle,
  //   innerRadius,
  //   outerRadius,
  //   percent,
  //   index,
  // }) => {
  //   const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
  //   const x = cx + radius * Math.cos(-midAngle * RADIAN);
  //   const y = cy + radius * Math.sin(-midAngle * RADIAN);

  //   return (
  //     <text
  //       x={x}
  //       y={y}
  //       fill="white"
  //       textAnchor="middle"
  //       dominantBaseline="central"
  //     >
  //       {`${(percent * 100).toFixed(0)}%`}
  //     </text>
  //   );
  // };

  return (
    <>
      <Head>
        <title>ピアサポータル</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />
      <div className="max-w-5xl m-auto" id="APP">
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          ピアサポータル出席管理
        </h2>
        <h2 className="text-center">会議一覧{meeting.length}件</h2>

        {IsPresent && (
          <>
            <ScrollArea>
              <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
                <thead>
                  <tr>
                    <th style={{ width: 40 }}>出欠</th>
                    <th>名前</th>
                    <th>学籍番号</th>
                    <th>年次</th>
                  </tr>
                </thead>
                {meeting &&
                  meeting.map((meeting) => (
                    <>
                      {meeting.id === ID && (
                        <tbody key={meeting.id}>
                          {users &&
                            users.map((user) => (
                              <tr key={user.id}>
                                <td>
                                  {meeting.attandece &&
                                    meeting.attandece.map(
                                      (attend: any, i: number) => (
                                        <div key={i}>
                                          {attend === user.univernumber ? (
                                            <div className="mt-2">
                                              <Checkbox
                                                transitionDuration={0}
                                                checked
                                              />
                                            </div>
                                          ) : (
                                            <></>
                                          )}
                                        </div>
                                      )
                                    )}
                                </td>
                                <td>
                                  <Group spacing="sm">
                                    <Text size="sm" weight={500}>
                                      {user.fullname}
                                    </Text>
                                  </Group>
                                </td>
                                <td>{user.univernumber}</td>
                                <td>{user.grade}</td>
                              </tr>
                            ))}
                        </tbody>
                      )}
                    </>
                  ))}
              </Table>
            </ScrollArea>
            {/* <div>
              <ResponsiveContainer height={256}>
                <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
                  <Pie
                    dataKey="value"
                    data={sample_data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    isAnimationActive={true}
                  >
                    {sample_data.map((entry, index) => (
                      <Cell fill={COLORS[index % COLORS.length]} key={index} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    wrapperStyle={{ bottom: 18 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div> */}
          </>
        )}

        {/* {meeting &&
          meeting.map((meeting) => (
            <div key={meeting.id}>
              <CardGradient
                id={meeting.id}
                title={meeting.title}
                date={meeting.date}
                present={meeting.attandece?.length}
                absent={users.length - meeting.attandece?.length}
                wariai={Math.floor(
                  (meeting.attandece?.length / users.length) * 100
                )}
                onClick={}
              /> */}
        {/* <h2>{meeting.title}</h2>
              <h3>日付：{meeting.date}</h3> */}
        {/* 出席{meeting.attandece?.length}人 欠席
                {users.length - meeting.attandece?.length}人 出席率 */}
        {/* {Math.floor((meeting.attandece?.length / users.length) * 100)}％ */}
        {/* <Button
                variant="outline"
                color="cyan"
                className=" my-2 m-4"
                onClick={() => getID(meeting.id, meeting.date, meeting.title)}
              >
                出席登録する
              </Button>
              <Button
                variant="outline"
                color="cyan"
                className=" my-2 m-4"
                onClick={() => getPresent(meeting.id)}
              >
                出席票を見る
              </Button>
              {IsPresent && (
                <Button
                  type="submit"
                  variant="outline"
                  color="cyan"
                  onClick={() => closePresent(meeting.id)}
                >
                  出席票を閉じる
                </Button>
              )}
              <Button
                variant="outline"
                color="cyan"
                className=" my-2 m-4"
                onClick={() => getID(meeting.id, meeting.date, meeting.title)}
              >
                出席を変更する
              </Button>
            </div>
          ))} */}

        <Modal
          contentLabel="Example Modal"
          isOpen={modalIsOpen}
          style={customStyles}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
        >
          <div>
            <p>
              おはようございます。<br></br>
              {title}の{date}日の出席登録ができます。
            </p>
            <form onSubmit={handleSubmit(updatefields)}>
              <p>
                <label htmlFor="univernumber">学籍番号</label>
                <Input
                  type="number"
                  id="univernumber"
                  {...register("univernumber")}
                />
              </p>
              <div className="text-center m-auto my-4">
                <span className="m-2">
                  <Button type="submit" variant="outline" color="cyan">
                    出席登録する
                  </Button>
                </span>
                <span className="m-2">
                  <Button
                    type="submit"
                    variant="outline"
                    color="cyan"
                    onClick={closeaddPresent}
                  >
                    取り消し
                  </Button>
                </span>
              </div>
            </form>
          </div>
        </Modal>

        {meeting &&
          meeting.map((meeting) => (
            <div key={meeting.id} className="my-4">
              <Paper withBorder radius="md" className={classes.card}>
                <Text size="xl" weight={500} mt="md">
                  {meeting.title}
                </Text>
                <Text size="sm" mt="sm" color="dimmed">
                  日付：{meeting.date}
                  開催前
                </Text>
                <Text size="sm" mt="sm" color="dimmed">
                  出席{meeting.attandece?.length}人 欠席
                  {users.length - meeting.attandece?.length}人 出席率
                  {Math.floor((meeting.attandece?.length / users.length) * 100)}
                  ％
                </Text>
                <Button
                  variant="outline"
                  color="cyan"
                  className=" my-2 m-4"
                  onClick={() => getID(meeting.id, meeting.date, meeting.title)}
                >
                  出席登録する
                </Button>
                <Button
                  variant="outline"
                  color="cyan"
                  className=" my-2 m-4"
                  onClick={() => getPresent(meeting.id)}
                >
                  出席票を見る
                </Button>
                {IsPresent && (
                  <Button
                    type="submit"
                    variant="outline"
                    color="cyan"
                    onClick={() => closePresent(meeting.id)}
                  >
                    出席票を閉じる
                  </Button>
                )}
                <Button
                  variant="outline"
                  color="cyan"
                  className=" my-2 m-4"
                  onClick={() => getID(meeting.id, meeting.date, meeting.title)}
                >
                  欠席に変更する
                </Button>
              </Paper>
            </div>
          ))}
      </div>
    </>
  );
}
