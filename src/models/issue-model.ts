export interface IssueModel{
    fields: Fields;
}

interface Project {
    key: string;
}

interface IssueTypeByName {
    name: string;
}

interface IssueTypeById {
    id: string;
}

type IssueType = IssueTypeByName | IssueTypeById;

interface Fields {
    project: Project;
    parent?:Parent;
    summary: string;
    description: string;
    issuetype: IssueType;
}

interface Parent {
    key: string;
}