export default function MovieDuration(duration:number){
    const hour = Math.floor(duration/60)
    const minute = Math.floor(duration%60)
    return {hour,minute}
}