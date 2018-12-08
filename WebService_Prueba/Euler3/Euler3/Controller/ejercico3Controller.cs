using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Euler3.data;

namespace Euler3.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ejercico3Controller : ControllerBase
    {
        private readonly ejercico3Context _context;

        public ejercico3Controller(ejercico3Context context)
        {
            _context = context;
        }

        // GET: api/ejercico3
        [HttpGet]
        public IEnumerable<ejercico3> GetreultEu3()
        {
            return _context.reultEu3;
        }

        // GET: api/ejercico3/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Getejercico3([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ejercico3 = await _context.reultEu3.FindAsync(id);

            if (ejercico3 == null)
            {
                return NotFound();
            }

            return Ok(ejercico3);
        }

        // PUT: api/ejercico3/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Putejercico3([FromRoute] int id, [FromBody] ejercico3 ejercico3)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ejercico3.id)
            {
                return BadRequest();
            }

            _context.Entry(ejercico3).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ejercico3Exists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/ejercico3
        [HttpPost]
        public async Task<IActionResult> Postejercico3([FromBody] ejercico3 ejercico3)
        {
            const long numero = 600851475143;
            ejercico3.resultado = 0;
            long[] factores = new long[2];

            for (long i = 2; i * i < numero; i++)
            {
                if (numero % i == 0)
                { // It is a divisor
                    factores[0] = i;
                    factores[1] = numero / i;

                    for (int k = 0; k < 2; k++)
                    {
                        bool esPrimo = true;
                        for (long j = 2; j * j < factores[k]; j++)
                        {
                            if (factores[k] % j == 0)
                            {
                                esPrimo = false;
                                break;
                            }
                        }
                        if (esPrimo && factores[k] > ejercico3.resultado)
                        {
                            ejercico3.resultado = factores[k];
                        }
                    }
                }
            }


            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.reultEu3.Add(ejercico3);
            await _context.SaveChangesAsync();

            return Ok(ejercico3.resultado + ejercico3.nombre);
        }

        // DELETE: api/ejercico3/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deleteejercico3([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var ejercico3 = await _context.reultEu3.FindAsync(id);
            if (ejercico3 == null)
            {
                return NotFound();
            }

            _context.reultEu3.Remove(ejercico3);
            await _context.SaveChangesAsync();

            return Ok(ejercico3);
        }

        private bool ejercico3Exists(int id)
        {
            return _context.reultEu3.Any(e => e.id == id);
        }
    }
}