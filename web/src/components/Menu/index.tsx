/**
 * @author zhengji.su
 * @description Menu
 */

import { useState, ReactNode } from 'react'
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { AccordionDetails, AccordionSummary } from "@mui/material";
import Buttons from "components/Buttons";
import clsx from "clsx";
import TransformIcon from "components/TransformIcon";
import { VariantContent } from "components/Variant";
import { stiffnessVariants } from "utils/variants";
import type { Theme } from "@mui/material";
import type { EmptyObject } from "@/src/tb.types"

export interface MenuItem extends EmptyObject {
  id: number | string;
  label: string;
  child?: MenuItem[];
}

interface MenuProps{
  menus: MenuItem[];
  isBorder?: boolean;
  onNodeClick?: (options: MenuItem) => void;
  childKey?: string;
  expandIcon?: ReactNode;
  closeIcon?: ReactNode;
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '100%',
  },
  accordion: {
    backgroundColor: theme.status.transparent,
    boxShadow: 'none',
    borderBottom: `${(props: MenuProps) => props.isBorder ? `1px solid ${theme.status.colorSecondary}` : 'none'}`,
    '&.MuiPaper-root': {
      borderRadius: 0,
    },
    '&.Mui-expanded': {
      margin: 0,
    },
    '&:last-of-type': {
      borderBottom: 'none'
    },
  },
  summary: {
    padding: 0,
    '&.Mui-expanded': {
      minHeight: 'auto'
    },
  },
  summaryContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 56,
    margin: 0,
    '&.Mui-expanded': {
      margin: 0,
    },
  },
  label: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: "center",
    padding: 0,
  },
  value: {
    padding: theme.spacing(0, 2, 2),
    '& > a': {
      display: 'block',
      height: 32,
      lineHeight: '32px'
    }
  },
  childItem: {
    display: 'block',
    height: 25,
    lineHeight: '25px',
    cursor: 'pointer'
  },
}))

function Menu(props: MenuProps) {
  const classes = useStyles(props)
  const { menus, onNodeClick, className, childKey = 'child', expandIcon, closeIcon } = props

  const [expanded, setExpanded] = useState<string | number | false>(false)

  const handleOpenAccordion = (panel: string | number) => {
      setExpanded(expanded === panel ? false : panel);
    };

  return (
    <VariantContent
      className={clsx(classes.root, className)}
    >
      {menus.map(menu => (
        <Accordion
          key={menu.id}
          expanded={expanded === menu.id}
          classes={{ root: classes.accordion }}
        >
          <VariantContent
            variants={stiffnessVariants}
          >
            <AccordionSummary classes={{
              root: classes.summary,
              expanded: classes.label,
              content: classes.summaryContent
            }}>
              <Typography flex={1} onClick={() => onNodeClick?.(menu)}>
                {menu.label}
              </Typography>
              {menu[childKey] && (
                <Buttons
                  variant="text"
                  space={false}
                  onClick={() => handleOpenAccordion(menu.id)}
                >
                  <TransformIcon focus={expanded === menu.id} originIcon={expandIcon} finishIcon={closeIcon} />
                </Buttons>
              )}
            </AccordionSummary>
          </VariantContent>
          {menu?.[childKey] && (
            <AccordionDetails classes={{ root: classes.value }}>
              {menu?.[childKey].map((c: MenuItem) => (
                <Typography
                  component="a"
                  key={c.id}
                  className={classes.childItem}
                  onClick={() => onNodeClick?.(c)}
                >
                  {c.label}
                </Typography>
              ))}
            </AccordionDetails>
          )}
        </Accordion>
      ))}
    </VariantContent>
  )
}

export default Menu