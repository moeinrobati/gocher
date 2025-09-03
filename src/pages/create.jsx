'use client'

import { TelegramInit } from '../components/TelegramInit';
import CopyInitData from '../components/CopyInitData';

export default function CreatePage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Create Page</h1>

      {/* این کامپوننت init() تلگرام را فراخوانی می‌کند */}
      <TelegramInit />

      {/* این کامپوننت initData را نمایش و کپی می‌کند */}
      <CopyInitData />
    </div>
  )
}
