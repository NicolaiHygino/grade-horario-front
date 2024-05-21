"use client";

import { Control, useFieldArray, useForm } from "react-hook-form";
import Timetable from "../shared/components/Timetable";
import { IEvent } from "../shared/components/Timetable/types/IEvents";
import { Container, DashbordGrid, FormWrapper } from "./styles";
import { IListPayload } from "../shared/types/IListPayload";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Dashboard() {
  const [modalEvent, setModalEvent] = useState<IEvent>();

  const { control, setValue } = useForm<IListPayload<IEvent>>();

  const {
    control: controlForm,
    handleSubmit: formHandleSubmit,
    reset: formReset,
  } = useForm<IEvent>({
    defaultValues: {
      name: "",
      startTime: "00:00",
      endTime: "00:00",
      bgColor: "#B0D0D3",
      weekDay: "DOMINGO",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "data",
    keyName: "hookId",
  });

  const addEvent = formHandleSubmit((data) => {
    append(data);
    formReset();
  });

  const removeEvent = () => {};

  useEffect(() => {
    setValue("data", events);
  }, [setValue]);

  return (
    <Container>
      <Timetable events={fields} />
    </Container>
  );
}

const ModalContainer = styled.div`
  display: flex;
  position: absolute;
  /* align-items: center; */
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  position: sticky;
  top: 100px;
  background-color: white;
  width: 300px;
  height: auto;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`;

const ModalHeader = styled.div<{ $bgColor: string }>`
  /* height: 50px; */
  font-size: 20px;
  width: 100%;
  padding: 20px;
  background-color: ${({ $bgColor }) => $bgColor};
`;

const ModalBody = styled.div`
  padding: 20px;
`;

interface IEventModal {
  event: IEvent | undefined;
}

function EventModal({ event }: IEventModal) {
  if (event === undefined) return null;
  return (
    <ModalContainer>
      <ModalWrapper>
        <ModalHeader $bgColor={event.bgColor}>teste</ModalHeader>
        <ModalBody>
          <p>{event.name}</p>
          <p>{event.startTime}</p>
          <p>{event.endTime}</p>
          <p>{event.weekDay}</p>
        </ModalBody>
      </ModalWrapper>
    </ModalContainer>
  );
}

export const events: IEvent[] = [
  {
    id: 900,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "SEGUNDA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "TERCA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "QUARTA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "QUINTA",
    bgColor: "#CDD3CE",
  },
  {
    id: 901,
    name: "Intervalo",
    startTime: "09:50",
    endTime: "10:10",
    weekDay: "SEXTA",
    bgColor: "#CDD3CE",
  },
];
