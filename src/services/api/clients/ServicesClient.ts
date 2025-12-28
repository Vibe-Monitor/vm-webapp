import { BaseClient, ApiResponse } from '../baseClient'

export interface Service {
  id: string
  name: string
  repository_full_name: string
  workspace_id: string
  created_at: string
  updated_at?: string
}

export interface ServiceCount {
  count: number
  limit: number
  is_paid: boolean
}

export interface CreateServiceRequest {
  name: string
  repository_full_name: string
}

export interface UpdateServiceRequest {
  name?: string
  repository_full_name?: string
}

export class ServicesClient {
  constructor(private baseClient: BaseClient) {}

  async getAll(workspaceId: string): Promise<ApiResponse<Service[]>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/services`)
  }

  async getCount(workspaceId: string): Promise<ApiResponse<ServiceCount>> {
    return this.baseClient.get(`/api/v1/workspaces/${workspaceId}/services/count`)
  }

  async create(workspaceId: string, data: CreateServiceRequest): Promise<ApiResponse<Service>> {
    return this.baseClient.post(`/api/v1/workspaces/${workspaceId}/services`, data)
  }

  async update(
    workspaceId: string,
    serviceId: string,
    data: UpdateServiceRequest
  ): Promise<ApiResponse<Service>> {
    return this.baseClient.put(`/api/v1/workspaces/${workspaceId}/services/${serviceId}`, data)
  }

  async delete(workspaceId: string, serviceId: string): Promise<ApiResponse<void>> {
    return this.baseClient.delete(`/api/v1/workspaces/${workspaceId}/services/${serviceId}`)
  }
}
