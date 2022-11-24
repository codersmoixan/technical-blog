/**
 * @author zhengji.su
 * @description Works
 */

import React from 'react'
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreativeParallel from "public/images/backdrop/creative-parallel.jpeg"
import Content from "components/common/Layout/Content";
import Root from "components/common/Layout/Root";

function Works() {

  return (
    <Root backdrop={CreativeParallel}>
      <Content>
        <Typography variant="h2">Works</Typography>
      </Content>
    </Root>
  )
}

export default Works