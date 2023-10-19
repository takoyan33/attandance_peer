import Head from "next/head";
import { useState, useEffect } from "react";
import { Paper } from "@mantine/core";
import { database } from "../firebaseConfig";
import moment from "moment";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
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
import { CommonHeader } from "../stories/components/CommonHeader";
import Modal from "react-modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { notify, signupmissnotify } from "../stories/components/SiteModal";
import TextField from "@mui/material/TextField";
import { MeetingStatus } from "../stories/components/MeetingStatus";
import { CommonButton } from "../stories/components/CommonButton";

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

export default function Index() {
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalabsentIsOpen, setabsentIsOpen] = useState<boolean>(false);
  const [searchName, setSearchName] = useState("");

  function closeModal() {
    setIsOpen(false);
  }

  function closeabsentModal() {
    setabsentIsOpen(false);
  }

  type FormData = {
    univernumber: number;
    attandece: number;
  };
  const { classes, cx } = useStyles();
  const { register, handleSubmit } = useForm<FormData>();
  const [IsPresent, setIsPresent] = useState(false);
  const [meeting, setMeeting] = useState<any[]>([]);
  const [ID, setID] = useState<any>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [date, setDate] = useState(null);
  const [title, setTitle] = useState("");
  const [presentnum, setPresentnum] = useState(null);
  const [absentnum, setAbsentnum] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const target = moment().format("YYYY-MM-DD");

  //出席を登録する
  const updatefields = (data: FormData) => {
    const userid = users.filter((user) => {
      return user.univernumber == data.univernumber;
    });
    console.log(userid[0].id);
    console.log(userid[0].attandece);
    //更新する
    let fieldToEdit = doc(database, "meeting", ID);
    let usersToEdit = doc(database, "users", userid[0].id);
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      attandece: arrayUnion(data.univernumber),
    })
      .then(() => {
        updateDoc(usersToEdit, {
          attandece: userid[0].attandece + 1,
        })
          .then(() => {
            setIsUpdate(false);
            setIsPresent(false);
            setIsOpen(false);
            notify("出席登録ができました");
          })
          .catch((err) => {
            signupmissnotify("出席登録に失敗しました");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //出席を削除する
  const deletefields = (data: FormData) => {
    //更新する
    let fieldToEdit = doc(database, "meeting", ID);
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      attandece: arrayRemove(data.univernumber),
    })
      .then(() => {
        setIsUpdate(false);
        setabsentIsOpen(false);
        notify("欠席に変更しました");
        router.push("/");
      })
      .catch((err) => {
        signupmissnotify("欠席に変更失敗しました");
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

  const dateja = new Date().toLocaleString("ja-JP");

  //出席登録のモーダル表示
  const getID = (id: any, date: any, title: any) => {
    setTitle(title);
    setDate(date);
    setIsOpen(true);
    setID(id);
    setIsUpdate(true);
  };

  //出席表の表示モーダル
  const getPresent = (id: any, date: any, title: any, attandece: any) => {
    setTitle(title);
    setDate(date);
    setID(id);
    setPresentnum(attandece.length);
    setIsPresent(true);
    setAbsentnum(users.length - attandece.length);
  };

  //欠席登録のモーダル表示
  const getabesentPresent = (id: any, date: any, title: any) => {
    setTitle(title);
    setDate(date);
    setabsentIsOpen(true);
    setID(id);
  };

  //出席登録の取り消しモーダル
  const closePresent = (id: any) => {
    setID(null);
    setTitle("");
    setDate(null);
    setID("");
    setPresentnum(null);
    setAbsentnum("");
    setIsPresent(false);
  };

  //欠席登録の取り消しモーダル
  const closeabsentPresent = (id: any) => {
    setID(null);
    setID(null);
    setTitle("");
    setDate(null);
    setID("");
    setPresentnum(null);
    setAbsentnum("");
    setabsentIsOpen(false);
  };

  //出席登録の取り消しモーダル
  const closeaddPresent = (id: any) => {
    setID(null);
    setTitle("");
    setDate(null);
    setID("");
    setPresentnum(null);
    setAbsentnum("");
    setIsOpen(false);
    setIsUpdate(false);
  };

  const sample_data = [
    { name: "出席数", value: presentnum },
    { name: "欠席数", value: absentnum },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const [scrolled, setScrolled] = useState(false);

  return (
    <>
      <Head>
        <title>ピアサポータル</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CommonHeader />
      <div className="max-w-5xl m-auto" id="APP">
        <ToastContainer />
        <h2 className="text-center text-2xl font-bold mb-6 mt-10">
          ピアサポータル出席管理
        </h2>
        <h2 className="text-center">会議一覧{meeting.length}件</h2>
        {IsPresent && (
          <>
            <CommonButton
              text="出席票を閉じる"
              classNameText="bg-blue-500 hover:bg-blue-700"
              onClick={() => closePresent(ID)}
            />
            <h2 className="text-center text-2xl">
              {date}日の{title}の出席表
            </h2>
            <div>
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
              <p className="text-center">
                出席数：{presentnum}人 欠席数：
                {absentnum}人
              </p>
            </div>
            <TextField
              type="text"
              id="outlined-basic"
              label="名前で検索する"
              variant="outlined"
              onChange={(event) => {
                setSearchName(event.target.value);
              }}
            />
            <ScrollArea sx={{ height: 300 }}>
              <Table sx={{ minWidth: 400 }}>
                <thead
                  className={cx(classes.header, {
                    [classes.scrolled]: scrolled,
                  })}
                >
                  <tr>
                    <th style={{ width: 40 }}>出欠</th>
                    <th style={{ width: 50 }}>名前</th>
                    <th style={{ width: 80 }}>学籍番号</th>
                    <th style={{ width: 70 }}>年次</th>
                  </tr>
                </thead>

                {meeting.map((meeting) => (
                  <>
                    {meeting.id === ID && (
                      <tbody key={meeting.id}>
                        {users
                          .filter((data) => {
                            if (searchName === "") {
                              return data;
                            } else if (
                              data.fullname
                                .toLowerCase()
                                .includes(searchName.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .map((user) => (
                            <tr key={user.id}>
                              <td>
                                {meeting.attandece.includes(
                                  user.univernumber
                                ) ? (
                                  <div className="mt-2">
                                    <Checkbox transitionDuration={0} checked />
                                  </div>
                                ) : (
                                  <>
                                    <Checkbox transitionDuration={0} />
                                  </>
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
          </>
        )}
        <Modal
          contentLabel="Example Modal"
          isOpen={modalIsOpen}
          style={customStyles}
          onRequestClose={closeModal}
        >
          <div>
            <p>
              おはようございます。<br></br>
              {title}の{date}日の出席登録ができます。
            </p>
            <form onSubmit={handleSubmit(updatefields)}>
              <p>
                <label htmlFor="univernumber">
                  学籍番号<span className="text-red-700">*</span>
                </label>
                <Input
                  type="number"
                  id="univernumber"
                  {...register("univernumber")}
                />
              </p>
              <div className="text-center m-auto my-4">
                <span className="m-2">
                  <CommonButton
                    text="出席登録する"
                    classNameText="bg-blue-500 hover:bg-blue-700"
                  />
                </span>
                <span className="m-2">
                  <CommonButton
                    text="取り消し"
                    onClick={closeaddPresent}
                    classNameText="bg-red-500 hover:bg-red-700"
                  />
                </span>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          contentLabel="Example Modal"
          isOpen={modalabsentIsOpen}
          style={customStyles}
          onRequestClose={closeabsentModal}
        >
          <div>
            <p>
              おはようございます。<br></br>
              {title}の{date}日の欠席登録ができます。
            </p>
            <form onSubmit={handleSubmit(deletefields)}>
              <p>
                <label htmlFor="univernumber">
                  学籍番号<span className="text-red-700">*</span>
                </label>
                <Input
                  type="number"
                  id="univernumber"
                  {...register("univernumber")}
                />
              </p>
              <div className="text-center m-auto my-4">
                <span className="m-2">
                  <CommonButton text="欠席登録する" />
                </span>
                <span className="m-2">
                  <Button
                    type="submit"
                    variant="outline"
                    color="cyan"
                    onClick={closeabsentPresent}
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
            <div key={meeting.id} className="my-4 w-80 m-auto text-center">
              <Paper withBorder radius="md" className={classes.card}>
                <Text size="xl" weight={500} mt="md">
                  {meeting.title}
                </Text>
                <MeetingStatus meetingDate={meeting.date} target={target} />
                <Text size="sm" mt="sm" color="dimmed">
                  出席{meeting.attandece?.length}人 欠席
                  {users.length - meeting.attandece?.length}人 出席率
                  {Math.floor((meeting.attandece?.length / users.length) * 100)}
                  ％
                </Text>
                <Text size="sm" mt="sm" color="dimmed">
                  {meeting.body}
                </Text>
                <div className="my-4 m-auto text-center">
                  <CommonButton
                    text="出席登録する"
                    onClick={() =>
                      getID(meeting.id, meeting.date, meeting.title)
                    }
                    classNameText="bg-blue-500 hover:bg-blue-700"
                  />
                </div>
                <div className="my-4 m-auto text-center">
                  <CommonButton
                    text="欠席に変更する"
                    onClick={() =>
                      getabesentPresent(meeting.id, meeting.date, meeting.title)
                    }
                    classNameText="bg-red-500 hover:bg-red-700"
                  />
                </div>
                <div className="my-4 m-auto text-center">
                  <CommonButton
                    text="出席票を見る"
                    onClick={() =>
                      getPresent(
                        meeting.id,
                        meeting.date,
                        meeting.title,
                        meeting.attandece
                      )
                    }
                    classNameText="bg-blue-500 hover:bg-blue-700"
                  />
                </div>
              </Paper>
            </div>
          ))}
      </div>
    </>
  );
}
