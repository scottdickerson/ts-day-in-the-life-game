#!/bin/bash

# Update package list
sudo apt update
sudo apt upgrade -y

# Install dependencies
sudo apt install -y curl wget gpg apt-transport-https

# Install VSCode
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
sudo install -D -o root -g root -m 644 packages.microsoft.gpg /etc/apt/keyrings/packages.microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/keyrings/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
rm -f packages.microsoft.gpg
sudo apt update
sudo apt install -y code

sudo apt install gnome-shell-extensions
sudo apt install gnome-tweaks
sudo apt install gnome-browser-connector
sudo apt uninstall apt remove update-notifier  # this is because we want to stop update notification popups

# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# Install Node.js LTS and npm
nvm install --lts
nvm use --lts

# Install Git
sudo apt install -y git gh

# Install Git LFS
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt install -y git-lfs
git lfs install

git config --global user.email dickerson.sd@gmail.com

# Install Nginx
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx

# Print versions
echo "Installed versions:"
code --version
nvm --version
node --version
npm --version
git --version
git lfs --version
nginx -v

echo "Installation complete!"
