import dayjs from "dayjs"

export function timezoneTool(time){

 return dayjs(time)
 .utc()
 .format()

}