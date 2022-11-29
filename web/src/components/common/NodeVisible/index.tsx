/**
 * @author zhengji.su
 * @description NodeVisible
 */

import React, { ReactNode} from 'react'
import {useRouter} from "next/router";
import Box from "@mui/material/Box";

interface NodeVisibleProps {
  children: ReactNode;
  blackList?: string[];
}

const useVisible = (list: string[]) => {
  const router = useRouter()

  return !list.includes(router.route)
}

function NodeVisible({ blackList = ['/editor'], ...other }: NodeVisibleProps) {
  const visible = useVisible(blackList)

  return visible ? <Box {...other} /> : null
}

export default NodeVisible
