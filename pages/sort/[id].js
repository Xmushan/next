import Router,{useRouter} from 'next/router'
const sortList = () => {
  const router = useRouter()
  const {id} = router.query
  return (
    <div>{id}</div>
  )
}
export default sortList
