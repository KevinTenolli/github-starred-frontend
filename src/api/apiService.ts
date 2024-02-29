import axiosInstance from "../middleware/axios"
import RepoCommits from "../models/RepoCommits"
import { GitHubUser } from "../models/githubUser"
import { StarredRepository } from "../models/starredRepository"

export default class ApiService {

    static async getUserData() {
        const response:GitHubUser = await axiosInstance.get('/oauth/getUserData')
        return response
    }
      
    static async getRepositoryData(username:string) {
        const response:StarredRepository[] = await axiosInstance.get(`/user/${username}/starredRepos`)
        return response
    }

    static async getRepositoryCommits(id: number) {
        const response: RepoCommits[] = await axiosInstance.get(`/repos/repo/${id}`)
        return response
    }
}