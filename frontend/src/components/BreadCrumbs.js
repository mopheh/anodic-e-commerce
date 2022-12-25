import * as React from "react"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"
import Link from "@mui/material/Link"
import Stack from "@mui/material/Stack"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

export default function BreadCrumbs({ wishlist, collection }) {
  const breadcrumbs = wishlist
    ? [
        <Link key="1" underline="none" color="inherit" href="/">
          Home
        </Link>,
        <Link key="2" underline="none" color="inherit" href="/wishlist">
          Wishlist
        </Link>,
      ]
    : collection
    ? [
        <Link key="1" underline="none" color="inherit" href="/">
          Home
        </Link>,
        <Link underline="none" key="2" color="inherit" disabled>
          Collections
        </Link>,
        <Link
          key="3"
          underline="none"
          color="inherit"
          className="text-capitalize"
          href={`/collections/${collection}`}
        >
          {collection}
        </Link>,
      ]
    : [
        <Link key="1" color="inherit" href="/">
          Home
        </Link>,
        <Link key="2" color="inherit" href="/wishlist">
          Wishlist
        </Link>,
        <Typography key="3" color="text.primary">
          Breadcrumb
        </Typography>,
      ]

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  )
}
