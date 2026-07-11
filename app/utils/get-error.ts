import type { FetchError } from "ofetch"

export default function getErroor(error: FetchError) {
  return {
    statusCode: error.statusCode || error.response?.status || 500,
    statusMessage: error.data.statusMessage || error.statusMessage || "An Unknow Error Occured"
  }
}