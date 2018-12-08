using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Euler3.data
{
    public class ejercico3Context: DbContext
    {
        public ejercico3Context(DbContextOptions<ejercico3Context> options) : base(options)
        { }
        public DbSet<ejercico3> reultEu3 { get; set; }
    }
}
