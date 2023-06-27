import React, { useState, useEffect, useRef } from "react";

import { getTimeInMin } from "../../utils/utils";

import playIcon from "../../style/icons/play.svg";
import pauseIcon from "../../style/icons/pause.svg";
import Icons from "../icons/icons";
import style from "./player.module.scss";

import { TCall } from "../../types/calls-types";

type TProps = {
  call: TCall;
  isHovered: boolean;
  isChecked: boolean;
  activeId: number | null;
  setActiveId: (id: number) => void;
};

const Player = ({
  call,
  isHovered,
  isChecked,
  activeId,
  setActiveId,
}: TProps) => {
  const [isPlay, setIsPlay] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [url, setUrl] = useState("");
  const [duration, setDuration] = useState<number | string>(call.time);
  const [progress, setProgress] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (call.id !== activeId && activeId !== null && isPlay) setIsPlay(false);
  }, [activeId]);

  useEffect(() => {
    if (isPlay) {
      if (activeId !== call.id) setActiveId(call.id);
      if (!url) {
        fetchRecord(call.record, call.partnership_id);
      } else {
        void audioRef.current?.play();
      }
    } else {
      if (url) void audioRef.current?.pause();
    }
  }, [isPlay]);

  useEffect(() => {
    if (url) void audioRef.current?.play();
  }, [url]);

  useEffect(() => {
    if (!isChecked && !isHovered && url && isPlay) setIsPlay(false);
  }, [isHovered]);

  const fetchRecord = (record: string, partnership_id: string) => {
    fetch(
      `https://api.skilla.ru/mango/getRecord?record=${record}& partnership_id=${partnership_id}`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer testtoken",
          "Content-type":
            "audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3",
          "Content-Transfer-Encoding": "binary",
          "Content-Disposition": `filename="record.mp3"`,
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.blob();
        } else {
          setIsPlay(false);
          throw new Error("Ошибка сети");
        }
      })
      .then((res) => {
        audioRef.current = new Audio(URL.createObjectURL(res));
        setUrl(URL.createObjectURL(res));
      })
      .catch((err) => console.log(err));
  };

  const handleAddClick = () => {
    if (isAdded) setIsAdded(false);
  };

  const handleTimeUpdate = () => {
    audioRef.current?.addEventListener("timeupdate", (e) => {
      const target = e.target as HTMLAudioElement;
      const duration = target.duration;
      const currentTime = target.currentTime;

      setDuration(duration - currentTime);
      setProgress((currentTime / duration) * 100);
    });
    audioRef.current?.addEventListener("ended", () => {
      handleEndingAudio();
      setProgress(0);
    });
  };

  const handleDuration = () => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      const diff = duration - currentTime;

      setDuration(getTimeInMin(Math.round(diff)));
    }
  };

  const handleEndingAudio = () => {
    setIsPlay(false);
    if (audioRef.current) {
      const duration = audioRef.current.duration;

      setDuration(Math.round(duration));
    }
  };

  const handleNewProgress = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (url) {
      const elem = document.getElementById(`bar${call.id}`);
      const elemWidth = elem?.getBoundingClientRect().width;
      let widthByClick;
      let newProgress;

      if (elem) widthByClick = e.clientX - elem?.getBoundingClientRect().left;
      if (widthByClick && elemWidth)
        newProgress = (widthByClick / elemWidth) * 100;

      if (newProgress) setProgress(Math.round(newProgress));

      if (audioRef.current && newProgress) {
        audioRef.current.currentTime = Math.round(
          (newProgress / 100) * audioRef.current?.duration
        );
      }
    }
  };

  const barStyleWidth = { width: `${progress}%` };

  return (
    <div className={style.player}>
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onLoadedMetadata={handleDuration}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndingAudio}
      ></audio>
      <div className={style.time}>
        {typeof duration === "string"
          ? duration
          : getTimeInMin(Math.round(duration)) === 0
          ? "0:00"
          : getTimeInMin(Math.round(duration))}
      </div>
      <button className={style.control} onClick={() => setIsPlay(!isPlay)}>
        {isPlay ? (
          <img src={pauseIcon} alt="Pause" className={style.pauseIcon} />
        ) : (
          <img src={playIcon} alt="Play" className={style.playIcon} />
        )}
      </button>
      <div
        className={style.bar}
        id={`bar${call.id}`}
        onClick={(e) => handleNewProgress(e)}
      >
        <div className={style.barBase}></div>
        <div className={style.barTop} style={barStyleWidth}></div>
      </div>
      <button className={style.download} onClick={() => setIsAdded(true)}>
        {isAdded ? (
          <Icons name="download" direction="added" />
        ) : (
          <Icons name="download" />
        )}
      </button>
      <button
        className={`${style.close} ${!isAdded ? style.closeHide : ""}`}
        onClick={handleAddClick}
      >
        {isAdded && <Icons name="close" />}
      </button>
    </div>
  );
};

export default Player;
