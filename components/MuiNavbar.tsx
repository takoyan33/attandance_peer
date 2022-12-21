import { AppBar, Toolbar, Button, Stack } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth, signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Logout from "@mui/icons-material/Logout";
import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";

export const MuiNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const logout = () => {
    localStorage.removeItem("Token");

    signOut(auth)
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <AppBar position="static" color="transparent" className="w-full m-0">
      <Box
        sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        className="w-full m-0"
      >
        <Toolbar className="w-full m-0">
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: "left" }}
          >
            <Link href="/">
              {/* <Image
                src="/magastudylogo.png"
                width="200"
                height="30"
                alt="ロゴ"
              /> */}
              ピアサポータル
            </Link>
          </Typography>
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>=</Avatar>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Divider />
        {user && (
          <>
            <MenuItem>
              <Link href="/user/new">学生を登録する</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/meeting/new">会議を登録する</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/user/edit">学生を編集する</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/meeting/edit">会議を編集する</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/user">学生別出席確認</Link>
            </MenuItem>
            <MenuItem>
              <button color="inherit" onClick={logout}>
                <Logout fontSize="small" />
                ログアウト
              </button>
            </MenuItem>
          </>
        )}
        {!user && (
          <>
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <Link href="/admin/login">管理者ログイン</Link>
            </MenuItem>
          </>
        )}
      </Menu>
    </AppBar>
  );
};
