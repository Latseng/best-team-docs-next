'use client'

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const MainMessage = () => {
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    //檢查localStorage儲存的資料：使用者是否看過通知？
    const hasSeenNotification = localStorage.getItem("hasSeenNotification");

     if (!hasSeenNotification) {
       setShowNotification(true);
       localStorage.setItem("hasSeenNotification", "true");
     }
  },[])

  if(showNotification) {
    return (
      <Dialog defaultOpen={true}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>更新通知</DialogTitle>
            <DialogDescription>
              文件資料庫系統版本升級
            </DialogDescription>
          </DialogHeader>
          <div>
            <ul className="grid gap-4 p-4">
              <li className="flex items-center gap-2">
                文件資料庫2.0簡介
                <Sparkles color="gold" />
              </li>
              <li>新增管理者編輯功能</li>
              <li>新增共筆專區</li>
              <li>安全性更新與錯誤修正</li>
            </ul>
            <p>開發者 前12番隊員 敬獻</p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button>關閉</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return null;
  
};

export default MainMessage;
