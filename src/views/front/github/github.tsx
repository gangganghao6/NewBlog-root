import { GetGithubList } from "@/requests/github/github"
import { useRequest } from "ahooks"
import { Pagination } from "antd"
import GithubCard from "./github-card"

export default function FrontGithub() {
  const { data, loading, run } = useRequest(
    (data) => GetGithubList({ page: 1, size: 10, sort: 'desc', ...data }),
    {
      manual: false
    }
  )

  return (
    <div>
      {data &&
        data?.data?.result.map((item: any) => {
          return <GithubCard data={item} />
        })}
      <div className="pt-8 pb-4">
        <Pagination
          className="text-center"
          defaultCurrent={1}
          total={data?.data?.count || 0}
          onChange={(e) => run({ page: e })}
        />
      </div>
    </div>
  )
}
