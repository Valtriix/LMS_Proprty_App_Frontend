# ProjectsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createProject**](#createproject) | **POST** /projects | Create Project|
|[**deleteProject**](#deleteproject) | **DELETE** /projects/{id} | Delete Project|
|[**getProjectById**](#getprojectbyid) | **GET** /projects/{id} | Get Project by ID|
|[**getProjects**](#getprojects) | **GET** /projects | Get Projects with Filters|
|[**projectComplianceReport**](#projectcompliancereport) | **GET** /projects/compliance | Project Compliance Report|
|[**updateProject**](#updateproject) | **PUT** /projects/{id} | Update Project|

# **createProject**
> Project createProject(project)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    Project
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let project: Project; //

const { status, data } = await apiInstance.createProject(
    project
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **project** | **Project**|  | |


### Return type

**Project**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Project created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteProject**
> deleteProject()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteProject(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**204** | Deleted |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProjectById**
> Project getProjectById()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getProjectById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Project**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Project details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProjects**
> Array<Project> getProjects()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let developerId: string; // (optional) (default to undefined)
let locationId: string; // (optional) (default to undefined)
let microMarket: string; // (optional) (default to undefined)
let projectType: string; // (optional) (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getProjects(
    developerId,
    locationId,
    microMarket,
    projectType,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **developerId** | [**string**] |  | (optional) defaults to undefined|
| **locationId** | [**string**] |  | (optional) defaults to undefined|
| **microMarket** | [**string**] |  | (optional) defaults to undefined|
| **projectType** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**Array<Project>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Project list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **projectComplianceReport**
> projectComplianceReport()


### Example

```typescript
import {
    ProjectsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let developerId: string; // (optional) (default to undefined)
let projectOwnerId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.projectComplianceReport(
    developerId,
    projectOwnerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **developerId** | [**string**] |  | (optional) defaults to undefined|
| **projectOwnerId** | [**string**] |  | (optional) defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: Not defined


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Compliance data |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **updateProject**
> Project updateProject(project)


### Example

```typescript
import {
    ProjectsApi,
    Configuration,
    Project
} from './api';

const configuration = new Configuration();
const apiInstance = new ProjectsApi(configuration);

let id: string; // (default to undefined)
let project: Project; //

const { status, data } = await apiInstance.updateProject(
    id,
    project
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **project** | **Project**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Project**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Updated project |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

