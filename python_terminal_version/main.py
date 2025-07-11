from interfaces import AbstractManagerInterface
from components import FunctionalRequirementManager
# from components import ArchitecturalRequirementManager

AbstractManagerInterface.register(FunctionalRequirementManager)
# AbstractManagerInterface.register(ArchitecturalRequirementManager)




title = r'''  _______ _                              _     _ _            _   
 |__   __| |              /\            | |   (_| |          | |  
    | |  | |__   ___     /  \   _ __ ___| |__  _| |_ ___  ___| |_ 
    | |  | '_ \ / _ \   / /\ \ | '__/ __| '_ \| | __/ _ \/ __| __|
    | |  | | | |  __/  / ____ \| | | (__| | | | | ||  __| (__| |_ 
    |_|  |_| |_|\___| /_/    \_|_|  \___|_| |_|_|\__\___|\___|\__|                                                              
'''

menu = """
1 Gerenciar requisitos funcionais
0 Sair
"""

def main():
    while True:
        print(title)
        print(menu)
        print("O que você deseja fazer?")
        
        break
    
main()