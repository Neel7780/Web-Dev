
import {Button} from "../components/ui/button"
import {Card} from "../components/ui/cards"
import {PlusIcon, ShareIcon} from "../assets/icons"
import { useEffect, useState } from "react"
import { Modal } from "../components/ui/modal"
import { Sidebar } from "../components/ui/sidebar"
import { useContent } from "../hooks/useContent"
import { BACKEND_URL } from "../configs"
import axios from "axios"

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  return (
    <div className="flex">
      <Sidebar/>
      <div className="w-full">
        <div className="flex justify-end gap-3 p-2">
          <Modal open={modalOpen} onClose={()=>{setModalOpen(false)}} />
          <Button size="md" variant="primary" icon={<PlusIcon size={"lg"} />} text="Create" onClick={()=>{setModalOpen(true)}}/>
          <Button onClick={async () => {
              const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                  share: true
              }, {
                  headers: {
                      "Authorization": `Bearer ${localStorage.getItem("token")}`
                  }
              });
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
          }} variant="secondary" text="Share brain" icon={<ShareIcon/>} size="md"></Button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {contents.map(({type, link, title}) => <Card 
              type={type}
              link={link}
              title={title}
          />)}
        </div>
      </div>
    </div>

  )
}


export default Dashboard
