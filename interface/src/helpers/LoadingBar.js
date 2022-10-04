import React from "react";
import Skeleton from "@mui/material/Skeleton";
const LoadingBar = () => {
  return (
    <>
      <tr>
        <td colSpan="10">
          <Skeleton variant="circular"></Skeleton>
        </td>
        {/* <td colSpan="10">Data tidak ada</td> */}
      </tr>
    </>
  );
};

export default LoadingBar;
