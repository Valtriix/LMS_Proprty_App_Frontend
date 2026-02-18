# LeadsApi

All URIs are relative to *http://localhost:8080*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createLead**](#createlead) | **POST** /leads | Create Lead|
|[**deleteLead**](#deletelead) | **DELETE** /leads/{id} | Delete Lead|
|[**getLeadById**](#getleadbyid) | **GET** /leads/{id} | Get Lead by ID|
|[**getLeads**](#getleads) | **GET** /leads | Get Leads with Filters|
|[**leadComplianceReport**](#leadcompliancereport) | **GET** /leads/compliance | Lead Process Compliance Report|
|[**updateLead**](#updatelead) | **PUT** /leads/{id} | Update Lead|

# **createLead**
> Lead createLead(lead)


### Example

```typescript
import {
    LeadsApi,
    Configuration,
    Lead
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let lead: Lead; //

const { status, data } = await apiInstance.createLead(
    lead
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lead** | **Lead**|  | |


### Return type

**Lead**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Lead created |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **deleteLead**
> deleteLead()


### Example

```typescript
import {
    LeadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.deleteLead(
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

# **getLeadById**
> Lead getLeadById()


### Example

```typescript
import {
    LeadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let id: string; // (default to undefined)

const { status, data } = await apiInstance.getLeadById(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Lead**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lead details |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getLeads**
> Array<Lead> getLeads()


### Example

```typescript
import {
    LeadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let projectId: string; // (optional) (default to undefined)
let leadQuality: string; // (optional) (default to undefined)
let status: string; // (optional) (default to undefined)
let fromDate: string; // (optional) (default to undefined)
let toDate: string; // (optional) (default to undefined)
let page: number; // (optional) (default to 0)
let size: number; // (optional) (default to 20)

const { status, data } = await apiInstance.getLeads(
    projectId,
    leadQuality,
    status,
    fromDate,
    toDate,
    page,
    size
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | (optional) defaults to undefined|
| **leadQuality** | [**string**] |  | (optional) defaults to undefined|
| **status** | [**string**] |  | (optional) defaults to undefined|
| **fromDate** | [**string**] |  | (optional) defaults to undefined|
| **toDate** | [**string**] |  | (optional) defaults to undefined|
| **page** | [**number**] |  | (optional) defaults to 0|
| **size** | [**number**] |  | (optional) defaults to 20|


### Return type

**Array<Lead>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Lead list |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **leadComplianceReport**
> leadComplianceReport()


### Example

```typescript
import {
    LeadsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let projectId: string; // (optional) (default to undefined)
let salesUserId: string; // (optional) (default to undefined)

const { status, data } = await apiInstance.leadComplianceReport(
    projectId,
    salesUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **projectId** | [**string**] |  | (optional) defaults to undefined|
| **salesUserId** | [**string**] |  | (optional) defaults to undefined|


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

# **updateLead**
> Lead updateLead(lead)


### Example

```typescript
import {
    LeadsApi,
    Configuration,
    Lead
} from './api';

const configuration = new Configuration();
const apiInstance = new LeadsApi(configuration);

let id: string; // (default to undefined)
let lead: Lead; //

const { status, data } = await apiInstance.updateLead(
    id,
    lead
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **lead** | **Lead**|  | |
| **id** | [**string**] |  | defaults to undefined|


### Return type

**Lead**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Updated lead |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

