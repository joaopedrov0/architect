from .FuncionalRequirement import FunctionalRequirement

class FunctionalRequirementManager():
    
    def __init__(self):
        self.menu = """
1 Criar requisito funcional
2 Ver requisitos funcionais
3 Editar requisitos funcionais
4 Deletar requisitos funcionais
0 Sair
"""
    
    def lifeCycle(self):
    
        while True:
            print(self.menu)
            print("O que você deseja fazer?")
            
            match(input()):
                case "1":
                    print("Criar requisito funcional")
                case "2":
                    print("Ver requisitos funcionais")
                case "3":
                    print("Editar requisitos funcionais")
                case "4":
                    print("Deletar requisitos funcionais")
                case "0":
                    break
                case _:
                    print("Opção inválida")
                    
            continue
    
    def create(self):
        pass
    
    def read(self):
        pass
    
    def edit(self):
        pass
    
    def delete(self):
        pass
    
a = FunctionalRequirementManager()
a.lifeCycle()