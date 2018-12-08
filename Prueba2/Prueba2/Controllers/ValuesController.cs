using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Prueba2.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : ControllerBase
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            string connectionString = "server=127.0.0.1;user id=root;password=root;port=3306;database=Score;SslMode=none";
            string query = "INSERT INTO puntajeJugador (Puntaje) values (3)";

            MySqlConnection Conexion = new MySqlConnection(connectionString);
            MySqlCommand comandos = new MySqlCommand(query, Conexion);
            comandos.CommandTimeout = 60;

            try
            {
                Conexion.Open();
                MySqlDataReader myReader = comandos.ExecuteReader();

                return new string[] { "Guardado" };
                //string mensaje = "Se guardo";
                //Console.WriteLine(mensaje);

            }
            catch
            {
                return new string[] {"Error"};
                //string mensaje = "Error";
                //Console.WriteLine(mensaje);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<controller>
        /*[HttpPost]
        public puntajes Index([FromBody]puntajes puntos)
        {
            return puntos;
        }
        public class puntajes
        {
            public string puntosJugador { get; set; }
        }*/

        [HttpPost]

        public void GuardarPuntaje ()
        {
            string connectionString = "datasource=127.0.0.1;port=3306;database=Score;username=root;password=root;";
            string query = "INSERT INTO puntajeJugador (Puntaje) values (2)";

            MySqlConnection Conexion = new MySqlConnection(connectionString);
            MySqlCommand comandos = new MySqlCommand(query, Conexion);
            comandos.CommandTimeout = 60;

            try
            {
                Conexion.Open();
                MySqlDataReader myReader = comandos.ExecuteReader();

                string mensaje = "Se guardo";
                Console.WriteLine(mensaje);
                Conexion.Close();

            }
            catch
            {
                string mensaje = "Error";
                Console.WriteLine(mensaje);
            }

        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
