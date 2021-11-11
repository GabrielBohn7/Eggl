namespace Core.Entities
{
    public class BasketItem
    {
        public int Id { get; set; }
        public string ProductNome { get; set; }
        public decimal preco { get; set; }
        public int Quantidade { get; set; }
        public string PictureUrl { get; set; }
        public string Categoria { get; set; }
    
    }
}