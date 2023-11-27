import { Controller } from "@hotwired/stimulus"
import { createConsumer } from "@rails/actioncable"

// Connects to data-controller="chatroom-subscription"
export default class extends Controller {
  static values = { chatroomId: Number }
  static targets = ["messages"]
  connect() {
    this.channel = createConsumer().subscriptions.create(
      {
        channel: "ChatroomChannel",
        id: this.chatroomIdValue
      },
      {
        received: data => this.#insertAndScrollDown(data)
      }

    )
  }

  #insertAndScrollDown(data){
    this.messagesTarget.insertAdjacentHTML("beforeend", data)
    this.messagesTarget.scrollTo(0, this.messagesTarget.scrollHeight )
  }

  resetForm(event) {
    console.log("triggered");
    event.target.reset()
  }

  disconnect(){
    this.channel.unsubscribe()
    console.log("we have unsubscribed from the general channel")
  }
}
