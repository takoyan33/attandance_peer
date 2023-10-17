import { createStyles, Paper, Text, ThemeIcon } from "@mantine/core";
import { Button } from "@mantine/core";
import Link from "next/link";

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
      transform: "scale(1.02)",
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

type CardGradientProps = {
  title: string;
  date: string;
  present: string;
  absent: any;
  wariai: any;
  id: any;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export function CardGradient({
  title,
  date,
  present,
  id,
  absent,
  wariai,
}: CardGradientProps) {
  const { classes } = useStyles();

  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Text size="xl" weight={500} mt="md">
        {title}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        {date}
      </Text>
      <Text size="sm" mt="sm" color="dimmed">
        出席{present}人 欠席
        {absent}人 出席率
        {wariai}％
      </Text>
    </Paper>
  );
}
