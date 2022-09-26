import { HubConnectionBuilder } from '@microsoft/signalr'

export const buzzConnection = new HubConnectionBuilder()
  .withUrl(import.meta.env.VITE_API + "/buzz")
  .build()