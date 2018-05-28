

# NOTE: In order for this to work, inside dale_chall_file there must be the words separated by ony
import os


class DaleChallWordListPuller:

    def __init__(self, dale_chall_word_array):
        self.dale_chall_word_array = dale_chall_word_array
        self.allWord_collection = []
        self.dale_chall_word_list = []
        self.word = ''
        self.c = ''
        self.dir_path = os.path.dirname(os.path.realpath(__file__))
        self.dale_chall_file = os.path.join(self.dir_path, 'dale_chall_wordList.txt')

    def dale_chall_analysis(self):

        print("Starting Dale-Chall list construction...")

        with open(self.dale_chall_file) as DC_List:
            while True:
                self.c = DC_List.read(1)
                if self.c != " ":
                    # Add a "in punctuation_list" if you cannot separat punctuation marks in the file
                    self.word = self.word + self.c
                if self.c == ' ':
                    if self.word not in self.dale_chall_word_list:
                        self.dale_chall_word_list.append(self.word.lower())
                        self.word = ''
                    else:
                        self.word = ''
                if not self.c:
                    self.word = ''
                    print("\tDale-Chall word list constructed")
                    break
