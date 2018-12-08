using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Eulerprueba1.data;

namespace Eulerprueba1.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class eusController : ControllerBase
    {
        private readonly euContext _context;

        public eusController(euContext context)
        {
            _context = context;
        }

        // GET: api/eus
        [HttpGet]
        public IEnumerable<eu> GetreultEu()
        {
            return _context.reultEu;
        }

        // GET: api/eus/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Geteu([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var eu = await _context.reultEu.FindAsync(id);

            if (eu == null)
            {
                return NotFound();
            }

            return Ok(eu);
        }

        // POST: api/eus
        [HttpPost]
        public async Task<IActionResult> Posteu([FromBody] eu eu)
        {
            eu.resultado = 0;
            for (int i = 1; i < 10; i++)
            {
                if (((i % eu.par) == 0) || ((i % eu.impar) == 0))
                {
                    eu.resultado += i;
                }
            }

            eu.resultado = eu.par * (999 / eu.impar) * ((999 / 15) + 1) / 2;
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _context.reultEu.Add(eu);
            await _context.SaveChangesAsync();
            
            return Ok(eu.nombre + eu.par + eu.impar + eu.resultado);
            //return CreatedAtAction("Getue", new { id = eu.id }, eu);
        }

    }
}