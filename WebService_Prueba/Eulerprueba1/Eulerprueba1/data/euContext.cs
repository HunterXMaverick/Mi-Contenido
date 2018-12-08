using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Eulerprueba1.data
{
    public class euContext: DbContext
    {
        public euContext(DbContextOptions<euContext> options) : base(options)
        {
        }
        
        public DbSet<eu> reultEu { get; set; }
    }
}
