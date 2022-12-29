import * as React from "react"
import Box from "@mui/material/Box"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import List from "@mui/material/List"
import Divider from "@mui/material/Divider"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { LinkContainer } from "react-router-bootstrap"
import { useSelector } from "react-redux"

export default function TemporaryDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  })
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }

    setState({ ...state, [anchor]: open })
  }

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Games", "TV", "Home-Appliances", "Computers", "Phones"].map(
          (text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {text === "Phones" && <i className="fas fa-mobile fa-1x"></i>}
                  {text === "Games" && <i className="fas fa-gamepad fa-1x"></i>}
                  {text === "Computers" && (
                    <i className="fas fa-laptop fa-1x"></i>
                  )}
                  {text === "TV" && <i className="fas fa-tv fa-1x"></i>}
                  {text === "Home-Appliances" && (
                    <i className="fas fa-blender-phone fa-1x"></i>
                  )}
                </ListItemIcon>
                <LinkContainer to={`/collections/${text.toLowerCase()}`}>
                  <ListItemText primary={text} />
                </LinkContainer>
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
      <Divider />
      <List>
        {["Search", "Wishlist", "Cart"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {text === "Search" && (
                  <i className="fa-solid fa-magnifying-glass fa-1x"></i>
                )}
                {text === "Wishlist" && (
                  <i className="fa-regular fa-heart fa-1x"></i>
                )}
                {text === "Cart" && (
                  <i className="fa-solid fa-cart-shopping fa-1x"></i>
                )}
              </ListItemIcon>
              <LinkContainer to={`/${text.toLowerCase()}`}>
                <ListItemText primary={text} />
              </LinkContainer>
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <i className="fa-regular fa-user fa-1x"></i>
            </ListItemIcon>
            <LinkContainer to={userInfo ? `/profile` : "/login"}>
              <ListItemText primary={userInfo ? `Profile` : "Signin"} />
            </LinkContainer>
          </ListItemButton>
        </ListItem>
      </List>
      {userInfo && userInfo.isAdmin && (
        <>
          <Divider />
          <List>
            {["Orders", "Users", "Products"].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon></ListItemIcon>
                  <LinkContainer
                    to={`/admin/${text.toLowerCase().slice(0, -1)}list`}
                  >
                    <ListItemText primary={text} />
                  </LinkContainer>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  )

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            className="position-absolute z-15"
          >
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  )
}
