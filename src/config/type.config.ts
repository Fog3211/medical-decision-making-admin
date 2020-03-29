// 对象类型
export interface anyObj {
    [name: string]: any
}
// 主题类型
export type MenuThemeProps = 'light' | 'dark'

// 话题类型
export type topicType = {
    id: number
    name: string
}
// 话题分类类型
export type forumType = {
    cate_id: number
    name: string,
    child: topicType[]
}
// 社区帖子标签
export interface communityPostType {
  tags_all_status: any;
    id: number
    create_time: string
    title: string
    content: string
    topic: string
    tags: tagsType[]
    tag_status: number
    tags_all:any
}
// 标签类型
export interface tagsType {
    id: number
    name: string
    department: string
}
// 标签名称管理
export interface tagNameManageType {
    id: number,
    name: string,
    department: string,
    synonym: string,
    show: boolean,
    negative: boolean,
    synToSearch: boolean,
    showInSearch: boolean,
    basic: boolean,
    describe: string,
    comment: string,
    createDate: string,
    updateDate: string,
    status: number
}
// 日期类型
export type dateType = {
    startTime?: string
    endTime?: string
}
