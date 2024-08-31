import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Grid,
  IconButton,
  Popper,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IEvent } from "../../types/IEvents";

type props = {
  id: string;
  open: boolean;
  event: IEvent | null;
  anchorEl: HTMLElement | null;
  handleSubmit?: (event: IEvent) => void;
  onClickAway?: () => void;
  handleDelete?: () => void;
};

export default function PopperForm({
  id,
  open,
  event,
  anchorEl,
  handleSubmit,
  onClickAway,
  handleDelete,
}: props) {
  const { register, handleSubmit: handleFormSubmit, reset } = useForm<IEvent>();

  const handleClose = (e: MouseEvent | TouchEvent) => {
    e.stopPropagation();
    onClickAway?.();
  };

  useEffect(() => {
    reset(event || {});
  }, [reset, event]);

  const onSubmit = handleFormSubmit((values) => {
    handleSubmit?.(values);
    onClickAway?.();
  });

  return (
    <Popper
      id={id}
      open={open}
      anchorEl={anchorEl}
      placement="right"
      sx={{ zIndex: 99999 }}
    >
      <ClickAwayListener
        mouseEvent="onClick"
        touchEvent="onTouchStart"
        onClickAway={handleClose}
      >
        <Card
          sx={{
            width: "300px",
            height: "auto",
          }}
          elevation={4}
        >
          <CardHeader
            sx={{ padding: "3px 13px", backgroundColor: "#ebebeb" }}
            action={
              <Box>
                {handleDelete && event && (
                  <IconButton
                    size="small"
                    aria-label="delete-card"
                    onClick={() => handleDelete()}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                )}
                <IconButton
                  size="small"
                  aria-label="close-card"
                  onClick={onClickAway}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
            }
          />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("name")}
                  fullWidth
                  label="Título"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("startTime")}
                  fullWidth
                  label="Início"
                  size="small"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register("endTime")}
                  fullWidth
                  label="Fim"
                  size="small"
                  type="time"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("bgColor")}
                  fullWidth
                  type="color"
                  label="Cor"
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item container xs={12} justifyContent="end">
                <Button onClick={onSubmit}>Salvar</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </ClickAwayListener>
    </Popper>
  );
}
