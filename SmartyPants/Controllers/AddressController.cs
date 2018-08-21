using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SmartyPants.Model;
using Newtonsoft.Json;

namespace SmartyPants.Controllers
{
    [Produces("application/json")]
    [Route("api/Address")]
    public class AddressController : Controller
    {
        const string smartyStreetsQueryFormat = "https://smarty-apim.azure-api.net/street-address?street={0}&city={1}&state={2}&zipcode={3}";

        [HttpPost]
        public async Task<IActionResult> Find([FromBody] Address address)
        {
            //"https://smarty-apim.azure-api.net/street-address?street=180%20W%20Julianna%20Dr&city=Southampton&state=PA&zipcode="
            using (HttpClient client = new HttpClient())
            {
                var url = String.Format(
                        smartyStreetsQueryFormat,
                        WebUtility.UrlEncode(address.Street),
                        WebUtility.UrlEncode(address.City),
                        WebUtility.UrlEncode(address.State),
                        WebUtility.UrlEncode(address.City)
                     );
                var response = await client.GetAsync(url);
                var json = await response.Content.ReadAsStringAsync();
                return Ok(JsonConvert.DeserializeObject(json));
            }
        }
    }
}